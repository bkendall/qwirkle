class Qwirkle
    init: (@canvas, @button, @debug) ->
        console.log "Initializing Qwirkle" if @debug
        @ctx = @canvas.getContext "2d"

        @ws = @create_websocket()

        @box_width = 35
        @box_height = 35
        @max_width = 500
        @max_height = 500
        @draw_grid @box_width, @box_height, @max_width, @max_height

        @canvas.onclick = (event) =>
            @fill_box event.layerX, event.layerY

        # TODO: dynamically create button or something
        @button.onclick = (event) =>
            @clear_grid false

    create_websocket: ->
        ws = new WebSocket "ws://#{window.location.host}/ws"
        ws.onopen = () =>
            console.log "initializing ws" if @debug
            @ws.send JSON.stringify {
                "action": "init",
            }
        ws.onmessage = (e) =>
            console.log "received: #{e.data}" if @debug
            @remote_action e.data
        return ws

    draw_grid: (box_width, box_height, max_width, max_height) ->
        # draw grid on 500x500 canvas
        y = 0
        while y <= max_height - box_height
            x = 0
            while x <= max_width - box_width
                @ctx.strokeRect x, y, box_width, box_height
                x += box_width
            y += box_height
        return

    fill_box: (click_x, click_y, remote_action) ->
        console.log "click #{click_x}, #{click_y}" if @debug
        x = click_x - (click_x % @box_width) + 1
        y = click_y - (click_y % @box_height) + 1
        @ctx.fillRect x, y, @box_width - 2, @box_height - 2

        if not remote_action
            @send_action {
                "action": "fill",
                "fill": {
                    "click_x": x,
                    "click_y": y,
                },
            }

    clear_grid: (remote_action) ->
        console.log "clearing board" if @debug
        @ctx.save()
        @ctx.fillStyle = "#FFFFFF"
        @ctx.fillRect 0, 0, @max_width, @max_height
        @ctx.restore()
        @draw_grid @box_width, @box_height, @max_width, @max_height

        if not remote_action
            @send_action {
                "action": "clear",
            }

    send_action: (data) ->
        @ws.send JSON.stringify data

    remote_action: (data) ->
        d = JSON.parse data
        if d.action is "fill"
            @fill_box d.fill.click_x, d.fill.click_y, true
        else if d.action is "clear"
            @clear_grid true

@Qwirkle = Qwirkle

module.exports = Qwirkle
