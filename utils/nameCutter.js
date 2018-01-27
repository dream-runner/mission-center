const calcDom = document.createElement('h3');
let avaliableWidth = 0;
let cuttedProcessTitle = '';
calcDom.style.fontSize = '14px';
calcDom.style.position = 'absolute';
calcDom.style.zIndex = '-1';
document.body.appendChild(calcDom);
export default (titleToCut,titleDomWidth,preserveWidth)=>{
    calcDom.innerHTML = '';
    cuttedProcessTitle = '';
    avaliableWidth = titleDomWidth*2-preserveWidth;
    //'...'占20像素
    avaliableWidth -= 20;
    for(let i=0;i<titleToCut.length;i++){
        calcDom.innerHTML += titleToCut[i];
        if(calcDom.clientWidth>avaliableWidth){
            cuttedProcessTitle =  calcDom.innerHTML.substring(0,calcDom.innerHTML.length-2)+'...';
            break;
        }
    }
    return cuttedProcessTitle || titleToCut;
}