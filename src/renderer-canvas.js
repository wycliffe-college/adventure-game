class CanvasRenderer {
    constructor(world, ctx, options = {}) {
        const defaultScale = 16;
        const defaultOptions = {
            scale: defaultScale,
            lineWidth: 1 / defaultScale,
            strokeStyle: {
                dynamic: 'white',
                static: 'white',
                kinematic: 'white',
            },
        };
        this.options = Object.assign(defaultOptions, options);
        if (!options.lineWidth) {
            this.options.lineWidth = 1 / this.options.scale
        }

        this.world = world;
        this.ctx = ctx;
        this.canvas = ctx.canvas;

        this.draw = null;

        this.clear = (canvas, ctx) => {
            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );
        }
    }

    renderBody(ctx, options, body) {
        for (
            let fixture = body.getFixtureList();
            fixture;
            fixture = fixture.getNext()
        ) {
            if (body.render && body.render.stroke) {
                ctx.strokeStyle = body.render.stroke;
            } else if (body.isDynamic()) {
                ctx.strokeStyle = options.strokeStyle.dynamic;
            } else if (body.isKinematic()) {
                ctx.strokeStyle = options.strokeStyle.kinematic;
            } else if (body.isStatic()) {
                ctx.strokeStyle = options.strokeStyle.static;
            }

            const type = fixture.getType();

            ctx.save();
            ctx.scale(this.options.scale, this.options.scale);
            ctx.lineWidth = options.lineWidth;
            if (type === "circle") {
                this.drawCircle(body, fixture);
            }
            if (type === "edge") {
                this.drawEdge(body, fixture);
            }
            if (type === "polygon") {
                this.drawPolygon(body, fixture);
            }
            if (type === 'chain') {
                this.drawPolygon(body, fixture);
            }
            ctx.restore()
        }
    }

    renderWorld( cliprect ) {
        const {ctx, canvas, options} = this;
        this.clear(canvas, ctx);
        if (typeof this.draw === 'function') {
            this.draw(ctx);
        }

        for( var drawingLayer =0 ; drawingLayer < 3 ; ++ drawingLayer ) {
          for (let body = this.world.getBodyList(); body; body = body.getNext()) {
            // don't draw invisible things
            if (body.render && body.render.hidden) continue;

            // don't draw things not on this layer
            if ( 'drawingLayer' in body ) {
              if (body.drawingLayer != drawingLayer) continue;
            } else {
              if( drawingLayer > 0 ) continue ;
            }

            // don't draw things not on the screen
            // ToDo using cliprect

            // finally - draw this thing
            this.renderBody(ctx, options, body)
          }
        }

        for (let joint = this.world.getJointList(); joint; joint = joint.getNext()) {
            ctx.save();
            ctx.scale(this.options.scale, this.options.scale);
            this.drawJoint(joint);
            ctx.restore()
        }
    }

    drawCircle(body, fixture) {
        const ctx = this.ctx;
        const lw = this.options.lineWidth;

        const radius = fixture.getShape().m_radius;
        const pos = body.getPosition();
        const angle = body.getAngle();

        ctx.translate(pos.x + lw, pos.y + lw);
        ctx.rotate(angle);

        if (body.render && body.render.custom) {
            const size = {
                width: radius * 2 + lw * 2,
                height: radius * 2 + lw * 2,
            };
            const pos = {
                x: -radius - lw * 2,
                y: -radius - lw * 2,
            };

            if (body.render.custom(fixture, ctx, pos, size + lw) !== true) {
                return
            }
        }

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.restore();
    }

    drawEdge(body, fixture) {
        const ctx = this.ctx;

        const v1 = fixture.getShape().m_vertex1;
        const v2 = fixture.getShape().m_vertex2;

        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.lineCap = 'round';
        ctx.stroke();
    }

    drawPolygon(body, fixture) {
        const ctx = this.ctx;
        const lw = this.options.lineWidth;

        const vertices = fixture.getShape().m_vertices;
        if (!vertices.length) {
            return;
        }

        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        for (const v of vertices) {
            minX = Math.min(minX, v.x);
            maxX = Math.max(maxX, v.x);
            minY = Math.min(minY, v.y);
            maxY = Math.max(maxY, v.y);
        }

        const width = maxX - minX;
        const height = maxY - minY;

        const pos = body.getPosition();
        const angle = body.getAngle();

        ctx.translate(pos.x + lw * 2, pos.y + lw * 2);
        ctx.rotate(angle);

        if (body.render && body.render.custom) {
            const size = {
                width: width + lw,
                height: height + lw,
            };
            const pos = {
                x: minX - lw,
                y: minY - lw,
            };

            if (body.render.custom(fixture, ctx, pos, size) !== true) {
                return
            }
        }

        ctx.beginPath();
        for (let i = 0; i < vertices.length; ++i) {
            const v = vertices[i];
            const x = v.x - lw;
            const y = v.y - lw;
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        if (vertices.length > 2) {
            ctx.closePath();
        }

        ctx.stroke();
    }

    drawJoint(joint) {
        const ctx = this.ctx;

        const a = joint.getAnchorA();
        const b = joint.getAnchorB();

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke()
    }
}

export {CanvasRenderer};
