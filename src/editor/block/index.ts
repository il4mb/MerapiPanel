export const propertyName = "@merapipanel\/editor\/block";



export const useProperty = () => {

    if (!(window as any)[propertyName]) {
        (window as any)[propertyName] = {
            hooks: new Map<string, Function>(),
            map: new Map<string, any>(),
            add: function (name: string, block: any) {
                this.map.set(name, block);
                this.hooks.forEach((callback: Function) => {
                    callback(this.map, name, block);
                });
            },
            get: function (id: string) {
                return (window as any)[propertyName].map[id];
            }
        }

       // console.log((window as any)[propertyName]);
    }

    const property = (window as any)[propertyName];



    return {
        add: function (name: string, block: any) {
            property.add(name, block);
        },
        get: function (id: string) {
            return property.get(id);
        },
        map: property.map,
        hook: (name: string, callback: Function) => {
            property.hooks.set(name, callback);
        }
    }
}




export const registerBlock = (name: string, blockData: any) => {
    useProperty().add(name, blockData);
}