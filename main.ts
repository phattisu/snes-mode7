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
    //%block=" draw isometric|from $from to $to by| HorizontalScroll: $H_scroll VerticalScroll: $V_scroll xmax: $A xmin: $B ymin: $C ymax: $D"
    //%from.shadow=screen_image_picker
    //%to.shadow=variables_get
    //%weight=10
    export function normalRender(from: Image, to: Image, H_scroll: number, V_scroll: number, A: number, B: number, C: number, D: number) {
        let Center_x = CalculateMode7(H_scroll,to.width)
        let Center_y = CalculateMode7(V_scroll,to.height)
        let color = 0
        for (let y = 0; y < to.height; y++) {
            for (let x = 0; x < to.width; x++) {
                color = from.getPixel(Math.trunc(Center_x + (0.00390625 * A * (x + (H_scroll - Center_x)) + 0.00390625 * B * (y + (V_scroll - Center_y)))), Math.trunc(Center_y + (0.00390625 * C * (x + (H_scroll - Center_x)) + 0.00390625 * D * (y + (V_scroll - Center_y)))))
                if (color > 0) { to.setPixel(x, y, color) }
            }
        }
    }

    /**
     * render image in perspective render
     */
    //%blockid=mode7_render_perspactive
    //%block=" draw perspective|from $from to $to by| HorizontalScroll: $H_scroll VerticalScroll: $V_scroll xmax: $A xmin: $B ymin: $C ymax: $D SubHorizontal: $H_inc SubVertical: $V_inc SubCenterx: $Cx_inc SubCentery: $Cy_inc Subxmax: $A_inc Subxmin: $B_inc Subymin: $C_inc Subymax: $D_inc"
    //%from.shadow=screen_image_picker
    //%to.shadow=variables_get
    //%weight=5
    export function perspactiveRender(from: Image, to: Image, H_scroll: number, V_scroll: number, A: number, B: number, C: number, D: number, H_inc: number, V_inc: number, Cx_inc: number, Cy_inc: number, A_inc: number, B_inc: number, C_inc: number, D_inc: number) {
        let Center_x = CalculateMode7(H_scroll, to.width)
        let Center_y = CalculateMode7(V_scroll, to.height)
        let color = 0
        for (let y = 0; y < to.height; y++) {
            for (let x = 0; x < to.width; x++) {
                color = from.getPixel(Math.floor(Center_x + y * Cx_inc + (1 / (A + y * A_inc) * (x + (H_scroll + y * H_inc - (Center_x + y * Cx_inc))) + (B + y * B_inc) * (y + (V_scroll + y * V_inc - (Center_y + y * Cy_inc))))), Math.floor(Center_y + y * Cy_inc + ((C + y * C_inc) * (x + (H_scroll + y * H_inc - (Center_x + y * Cx_inc))) + 1 / (D + y * D_inc) * (y + (V_scroll + y * V_inc - (Center_y + y * Cy_inc))))))
                if (color > 0) { to.setPixel(x, y, color) }
            }
        }
    }

    /**
     * render image in distort render
     */
    //%blockid=mode7_render_distort
    //%block=" draw perspective|from $from to $to by| size $size x1 $x1 y1 $y1 x2 $x2 y2 $y2 x3 $x3 y3 $y3 x4 $x4 y4 $y4"
    //%from.shadow=screen_image_picker
    //%to.shadow=variables_get
    //%weight=5
    export function distortRender(from: Image, to: Image, size: number,
        x1: number, y1: number, x2: number, y2: number,
        x3: number, y3: number, x4: number, y4: number) {
        for (let y = 0; y < from.height; y++) {
            for (let x = 0; x < from.width; x++) {
                const col = from.getPixel(from.width - x, from.height - y);
                if (col && col > 0) {
                    const sx = (s: number, m?: boolean) => Math.trunc((1 - ((y * s) + (m ? s : 0) - (s / 2)) / (from.height * s)) * (x1 + ((x * s) + (m ? s : 0) - (s / 2)) / (from.width * s) * (x2 - x1)) + ((y * s) + (m ? s : 0) - (s / 2)) / (from.height * s) * (x3 + ((x * s) + (m ? s : 0) - (s / 2)) / (from.width * s) * (x4 - x3)))
                    const sy = (s: number, m?: boolean) => Math.trunc((1 - ((x * s) + (m ? s : 0) - (s / 2)) / (from.width * s)) * (y1 + ((y * s) + (m ? s : 0) - (s / 2)) / (from.height * s) * (y3 - y1)) + ((x * s) + (m ? s : 0) - (s / 2)) / (from.width * s) * (y2 + ((y * s) + (m ? s : 0) - (s / 2)) / (from.height * s) * (y4 - y2)))
                    helpers.imageFillPolygon4(to, sx(size), sy(size), sx(size, true), sy(size), sx(size), sy(size, true), sx(size, true), sy(size, true), col)
                }
            }
        }
    }

}
