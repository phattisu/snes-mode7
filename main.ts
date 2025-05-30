//%block="SnesMode7"
//%color="#6346e8"
//%icon="\uf018"
namespace snesmode7 {

    function CalculateMode7(a: number,b: number) {
        return a + 0.5 * b
    }

    /**
     * render image in isometric render
     */
    //%blockid=mode7_render_normal
    //%block=" draw isometric|from $from to $to by| HorizontalScroll: $H_scroll VerticalScroll: $V_scroll Xmax: $A Xmin: $B Ymin: $C Ymax: $D"
    //%from.shadow=screen_image_picker
    //%to.shadow=variables_get
    //%weight=10
    export function normalRender(from: Image, to: Image, H_scroll: number, V_scroll: number, A: number, B: number, C: number, D: number) {
        let Center_X = CalculateMode7(H_scroll,to.width)
        let Center_Y = CalculateMode7(V_scroll,to.height)
        let color = 0
        for (let y = 0; y < to.height; y++) {
            for (let x = 0; x < to.width; x++) {
                color = from.getPixel(Math.trunc(Center_X + (0.00390625 * A * (x + (H_scroll - Center_X)) + 0.00390625 * B * (y + (V_scroll - Center_Y)))), Math.trunc(Center_Y + (0.00390625 * C * (x + (H_scroll - Center_X)) + 0.00390625 * D * (y + (V_scroll - Center_Y)))))
                if (color > 0) { to.setPixel(x, y, color) }
            }
        }
    }

    /**
     * render image in perspective render
     */
    //%blockid=mode7_render_perspactive
    //%block=" draw perspective|from $from to $to by| HorizontalScroll: $H_scroll VerticalScroll: $V_scroll Xmax: $A Xmin: $B Ymin: $C Ymax: $D SubHorizontal: $H_inc SubVertical: $V_inc SubCenterX: $CX_inc SubCenterY: $CY_inc SubXmax: $A_inc SubXmin: $B_inc SubYmin: $C_inc SubYmax: $D_inc"
    //%from.shadow=screen_image_picker
    //%to.shadow=variables_get
    //%weight=5
    export function perspactiveRender(from: Image, to: Image, H_scroll: number, V_scroll: number, A: number, B: number, C: number, D: number, H_inc: number, V_inc: number, CX_inc: number, CY_inc: number, A_inc: number, B_inc: number, C_inc: number, D_inc: number) {
        let Center_X = CalculateMode7(H_scroll, to.width)
        let Center_Y = CalculateMode7(V_scroll, to.height)
        let color = 0
        for (let y = 0; y < to.height; y++) {
            for (let x = 0; x < to.width; x++) {
                color = from.getPixel(Math.floor(Center_X + y * CX_inc + (1 / (A + y * A_inc) * (x + (H_scroll + y * H_inc - (Center_X + y * CX_inc))) + (B + y * B_inc) * (y + (V_scroll + y * V_inc - (Center_Y + y * CY_inc))))), Math.floor(Center_Y + y * CY_inc + ((C + y * C_inc) * (x + (H_scroll + y * H_inc - (Center_X + y * CX_inc))) + 1 / (D + y * D_inc) * (y + (V_scroll + y * V_inc - (Center_Y + y * CY_inc))))))
                if (color > 0) { to.setPixel(x, y, color) }
            }
        }
    }

}
