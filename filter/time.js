let reg = /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})\.\d{3}\+08:00/

export default function (str) {
    return str.replace(reg, "$1 $2")
}
