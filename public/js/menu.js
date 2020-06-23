$(document).ready(function () {

    let desktop = '';
    desktop +='<div class="container-fluid">\n' +
             '            <div class="d-flex d-lg-flex d-md-flex  responsive-mobile">\n' +
             '                <div class="item">\n' +
             '                    <a href="javascript:void(0);" data-tab="home" id="home"><i class="icon icon_home"></i><p>Home</p></a>\n' +
             '                </div>\n' +
             '                <div class="item">\n' +
             '                    <a href="javascript:void(0);" data-tab="play" id="play"><i class="icon icon_circled_play"></i><p>Play</p></a>\n' +
             '                </div>\n' +
             '                <div class="item">\n' +
             '                    <a href="shopping.html" data-tab="shopping" id="shopping"><i class="icon icon_shopping"></i><p>Shopping</p></a>\n' +
             '                </div>\n' +
             '                <div class="item">\n' +
             '                    <a href="javascript:void(0);" data-tab="folder" id="folder"><i class="icon icon_folder"></i><p>Folder</p></a>\n' +
             '                </div>\n' +
             '                <div class="item">\n' +
             '                    <a href="javascript:void(0);" data-tab="chat" id="chat"><i class="icon icon_chat"></i><p>Chat</p></a>\n' +
             '                </div>\n' +
             '                <div class="item">\n' +
             '                    <a href="javascript:void(0);" data-tab="location" id="location"><i class="icon icon_delivered"></i><p>Location</p></a>\n' +
             '                </div>\n' +
             '                <div class="item">\n' +
             '                    <a href="javascript:void(0);" data-tab="security"  id="security"><i class="icon icon_security"></i><p>Security</p></a>\n' +
             '                </div>\n' +
             '                <div class="item">\n' +
             '                    <a href="javascript:void(0);" data-tab="japan" id="japan"><i class="icon icon_geisha"></i><p>Japan</p></a>\n' +
             '                </div>\n' +
             '                <div class="item">\n' +
             '                    <a href="javascript:void(0);" id="setting" data-tab="setting"><i class="icon icon_maintenance"></i><p>Setting</p></a>\n' +
             '                </div>\n' +
             '            </div>\n' +
             '        </div>';
   $('#desktop').html(desktop);
});