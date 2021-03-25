const shell = require('electron').shell
const openBtn = document.getElementById('openBtn')
openBtn.addEventListener('click', function(event) {
    shell.showItemInFolder('D:\electron folder\demo.txt')
    shell.openItem('D:\electron folder\Primakara.jpg')
    shell.openExternal('http://electron.atom.io')
})