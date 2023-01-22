import { optimize } from './optimize';


function main() {
    const width = 100;
    const height = 100;
    optimize(width, height, ".")
    console.log('start: dev');
}

main()