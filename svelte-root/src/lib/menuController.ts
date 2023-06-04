export type CloseFn = () => void;

export type MenuController = {
    openMenus: Array<{ key: any, fn: CloseFn }>;
    addOpenMenu: (fn: CloseFn, key: any, level: number) => void;
    close: (level?: number) => void;
    clear: (key: any, level: number) => void;
};

export default function createMenuController(): MenuController {
    return {
        openMenus: [],
        addOpenMenu(closeFn, key, level) {
            console.group('addOpenMenu.  Level: %d', level);
            if (this.openMenus.length >= level) {
                console.log('Need to close some menus first...');
                this.close(level);
            }
            this.openMenus.push({
                key,
                fn: closeFn
            });
            console.log('Currently open menus: %d', this.openMenus.length);
            console.groupEnd();
        },
        close(level = 1) {
            console.group('closeAll.  Level: %d', level);
            while (this.openMenus.length >= level) {
                console.log('Closing menu level %d...', this.openMenus.length);
                const item = this.openMenus.pop();
                (item?.fn ?? (() => { }))();
            }
            console.groupEnd();
        },
        clear(key, level) {
            console.group('clear.  Level: %d', level);
            console.log('Key undefined: %s', key === undefined);
            if (this.openMenus.length > level) {
                console.log('Clearing menu level %d requires closing children.', level);
                this.close(level + 1);
            }
            if (this.openMenus.length < level) {
                console.warn('Cannot clear at level %d because current level %d is inferior.', level, this.openMenus.length);
            }
            else if (key !== this.openMenus[level - 1].key) {
                console.warn('Cannot cut the menu tail because the provided item and the stored item are not the same.');
            }
            else {
                console.log("Removing open menus' tail...");
                this.openMenus.pop();
            }
            console.log('Currently open menus: %d', this.openMenus.length);
            console.groupEnd();
        }
    }
};
