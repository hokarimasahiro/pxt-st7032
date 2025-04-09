/**
 * lcd st7032 blocks
 */
//% weight=100 color=#0fbc11 icon="\uf3fa"
namespace st7032 {
    let i2cAddress = 0x3f;
    let topAddress = [0x00,0x40,0x14,0x54];

    //% blockId="putCommand" block="put command"
    export function putCommand(data: number) {
        let buf = pins.createBuffer(2);
        buf[0] = 0x00;
        buf[1] = data >> 0;
        pins.i2cWriteBuffer(i2cAddress, buf);
    }

    //% blockId="putData" block="put data"
    export function putData(data: number) {
        let buf = pins.createBuffer(2);
        buf[0] = 0x40;
        buf[1] = data >> 0;
        pins.i2cWriteBuffer(i2cAddress, buf);
    }

    //% blockId="setAddress" block="set address"
    export function setAddress(ad:number): void {
        i2cAddress = ad;
    }
    /**
     * initLcd
     */
    //% blockId="initLcd" block="init lcd"
    export function initLcd(): void {
        putCommand(0x38);
        putCommand(0x01);
        putCommand(0x02);
        putCommand(0x0c);
    }

    //% blockId="setPosition" block="set position"
    export function setPosition(x:number,y:number): void {
        if((x > 3) || (y > 20)) return;

        putCommand( 0x80 + topAddress[x] + y);
    }
    //% blockId="writeData" block="write data"
    export function writeData(dt:string): void {
        for(let i = 0;i < dt.length;i++)
            putData(dt.charCodeAt(i));
    }
}
