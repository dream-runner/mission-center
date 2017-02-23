import forEach from 'lodash/forEach'

const colors = ['#FF835F', '#38CBFA', '#00DA8F', '#00CAB8', '#ED4047',
'#F7B71C', '#38AFD9', '#39B588', '#0085AE', '#4EC8CD']

let makeRandom = (str) => {
    let code = 0
    forEach(str, (v, i) => {
        code += str.charCodeAt(i)
    })
    return code % colors.length
}

export function getRandomColor (str) {
    return colors[makeRandom(str)]
}
