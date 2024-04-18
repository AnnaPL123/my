blocks=["img/block1.png","img/block2.png","img/block3.png","img/block4.png","img/block5.png","img/block6.png"];
var hearts=5;
var steps=0;
var pole_blocks=[];
var pole_barrier = [ ];
var rows=1;
var indBlock_old = 5;
//заполняем массив препятствий
for (i = 0; i < 17; i++) {
    pole_barrier[i] = 0; //0-пусто,1-кирпичный блок,2-мосток
}

//Генерируем 5 сердец
for(i=1;i<6;i++){
    idImg=document.getElementById('heart'+i);
    idImg.src="img/heart_full.png";
}
//Создаём ландшафт
pole0_0.src="img/block6.png";
pole0_16.src="img/block6.png";
pole_blocks[0] = 5;
pole_blocks[16] = 5;
for(i=1;i<16;i++){
    indBlock=Math.floor(Math.random()*5);
    while (indBlock == indBlock_old) {
        indBlock = Math.floor(Math.random() * 5)
    }
    idImg=document.getElementById('pole0_'+i);
    idImg.src=blocks[indBlock];
    pole_blocks[i] = indBlock;
    if (indBlock == 0) {
        idImg = document.getElementById('pole1_' + i);
        idImg.src = blocks[indBlock];
        pole_barrier[i] = 1;
    }
    indBlock_old = indBlock;
}
pole1_0.src="img/mario_running.gif";
//Задаём передвижение
function mario_move(event){
    switch (event.key) {
        case 'ArrowRight':
    //if (event.key=="ArrowRight" && steps<16){
        if (pole_barrier[steps + 1] != 1 && rows==1){
        idImg=document.getElementById('pole'+rows+'_'+steps);
        idImg.src="img/spacer.gif";
        steps++;
        rows=1;
        idImg=document.getElementById('pole1_'+steps);
        idImg.src="img/mario_running.gif";
        checkBlock();}
        if(rows==2){
            idImg=document.getElementById('pole'+rows+'_'+steps);
            idImg.src="img/spacer.gif";
            steps++;
            if(pole_barrier[steps]!=2 && pole_barrier[steps]!=1){
                rows=1;
                checkBlock();
            }else{
                rows=2;
                getCoin();
            }
            idImg=document.getElementById('pole'+rows+'_'+steps);
            idImg.src="img/mario_running.gif";
        }
        break;
        case 'Shift':
            idImg = document.getElementById('pole' + rows + '_' + steps);
            idImg.src = "img/spacer.gif";
            steps++;
            if (rows==2&&pole_barrier[steps] != 1&& pole_barrier[steps] != 2){
                rows=1;
            }else{ // если Марио в первой строке, он подпрыгивает во вторую
            rows = 2;}
            idImg = document.getElementById('pole' + rows + '_' + steps);
            idImg.src = "img/mario_running.gif";
            checkBlock();
            if(rows==2){
                getCoin();
            }
            break;
        case 'ArrowUp':
            idImg=document.getElementById('pole'+rows+'_'+steps);
            idImg.src='img/spacer.gif';
            rows=2;
            idImg=document.getElementById('pole'+rows+'_'+steps);
            idImg.src='img/mario_running.gif';
            getCoin();
            break;
        case 'ArrowDown':
            if(n>1){
                n--;
                idImg=document.getElementById('coin'+n);
                idImg.src='img/spacer.gif';
                idImg=document.getElementById('pole1_'+(steps+1));
                idImg.src="img/most.png";
                pole_barrier[steps+1]=2;
        }else{
            alert('У вас нет денег на постройку моста!')
        }
            break;

}
}
var blockitem=0;
function checkBlock(){
    if(rows!=2){
        blockitem=pole_blocks[steps];
        switch(blockitem){
            case 5:
                if(steps!=0){alert("Уровень пройден!")}
                break;
            case 4:
                idImg=document.getElementById('heart'+hearts);
                idImg.src="img/heart_empty.png";
                hearts--;
                break;
            case 2:
                idImg=document.getElementById('pole'+rows+'_'+steps);
                idImg.src='img/spacer.gif';
                steps=0;
                idImg=document.getElementById('pole'+rows+'_'+steps);
                idImg.src='img/mario_running.gif';
                break;
            case 1:
                rndBlock=Math.floor(Math.random()*5);
                idImg=document.getElementById('pole0_'+steps);
                idImg.src=blocks[rndBlock];
                pole_blocks[steps]=rndBlock;
                checkBlock();
                break;
        }
    }

} 
var n=1;
var money=[];
for(i=1;i<16;i++) {
    money[i]=0;
}
for (i=1;i<6;i++){
    indCoin=Math.floor(Math.random()*15+1);
    idImg=document.getElementById('pole2_'+indCoin);
    idImg.src='img/coin.gif';
    money[indCoin]=1;
}
function getCoin(){
    if(money[steps]==1){
        idImg1=document.getElementById('coin'+n);
        idImg1.src='img/bonus.png';
        n++;
        money[steps]=0;
    }
}
document.addEventListener('keydown',mario_move)


