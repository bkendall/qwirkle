Qwirkle = require "../../static/js/src/qwirkle.coffee"

describe "Qwirkle functions", ->
    q = undefined
    canvas = undefined
    button = undefined
    ctx = undefined
    
    beforeEach ->
        button = jasmine.createSpyObj("button", ["onclick"])
        canvas = jasmine.createSpyObj("canvas", ["getContext"])
        ctx = jasmine.createSpyObj("ctx", ["fillRect", "strokeRect"])
        canvas.getContext.andReturn ctx

        q = new Qwirkle

        ws = jasmine.createSpyObj("WebSocket", ["send"])
        spyOn(q, "create_websocket").andCallFake ->
            return ws
        spyOn(q, "draw_grid").andCallThrough()

        q.init canvas, button

    it "expects to construct correctly", ->
        expect(q).toBeDefined()
        expect(q instanceof Qwirkle).toBe true
        expect(q.draw_grid).toHaveBeenCalled()
        expect(canvas.getContext).toHaveBeenCalled()
        expect(canvas.getContext.calls.length).toEqual 1

    it "should draw on the context the correct number of boxes on init", ->
        expect(q.draw_grid).toHaveBeenCalled()
        expect(q.draw_grid.calls.length).toEqual 1
        expect(q.draw_grid.mostRecentCall.args).toEqual [35, 35, 500, 500]
        expect(ctx.strokeRect).toHaveBeenCalled()
        expect(ctx.strokeRect.calls.length).toEqual(Math.pow Math.floor(500/35), 2)

    it "should draw squares through draw_grid", =>
        init_strokeRect_calls = ctx.strokeRect.calls.length

        x = 100
        y = 100
        w = 500
        h = 500
        q.draw_grid x, y, w, h

        expect(ctx.strokeRect).toHaveBeenCalled()
        expect(ctx.strokeRect.calls.length - init_strokeRect_calls)\ 
            .toEqual(Math.pow Math.floor(w/x), 2)

