export let mode: string;
export let devtool: boolean;
export let entry: {};
export namespace output {
    let filename: string;
    let path: string;
    let asyncChunks: boolean;
}
export let plugins: any[];
export namespace module {
    let rules: ({
        test: RegExp;
        exclude: RegExp;
        loader: string;
        options: {
            presets: string[];
        };
        use?: undefined;
        type?: undefined;
    } | {
        test: RegExp;
        use: string[];
        exclude?: undefined;
        loader?: undefined;
        options?: undefined;
        type?: undefined;
    } | {
        test: RegExp;
        type: string;
        exclude?: undefined;
        loader?: undefined;
        options?: undefined;
        use?: undefined;
    })[];
}
export namespace resolve {
    let extensions: string[];
    namespace alias {
        let src: string;
    }
}
export let watch: boolean;
export namespace watchOptions {
    let ignored: string[];
    let aggregateTimeout: number;
    let poll: number;
}
