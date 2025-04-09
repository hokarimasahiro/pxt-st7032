basic.forever(function() {
    st7032.initLcd();
    basic.pause(500)
    st7032.setPosition(0, 0);
    st7032.writeData("lcd write block");
    basic.pause(200)
    st7032.setPosition(1, 0);
    st7032.writeData("for micro:bit");
    basic.pause(200)
    st7032.setPosition(2, 0);
    st7032.writeData("made by pokarihonpo");
    basic.pause(200)
    st7032.setPosition(3, 0);
    st7032.writeData("  masahiro hokari");
    basic.pause(2000);
})