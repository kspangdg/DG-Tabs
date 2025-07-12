/**
 * @class DG_Tabs
 * @description Basic, but ADA friendly tabs.
 * @author Keith Spang
 * @version 1.0.0
 */

class DG_Tabs {

    private tab_list: HTMLElement;
    private tabs: HTMLElement[];
    private firstTab: HTMLElement;
    private lastTab: HTMLElement;
    private tab_panels: HTMLElement[];

    constructor(tab_list: HTMLElement) {
        this.tab_list = tab_list;
        this.tabs = [];
        this.first_tab = null;
        this.last_tab = null;
        this.tabs = Array.from(this.tab_list.querySelectorAll('[role=tab]'));
        this.tab_panels = [];

        for (var i = 0; i < this.tabs.length; i += 1) {
            const tab: HTMLElement = this.tabs[i];
            const tabpanel = document.getElementById(tab.getAttribute('aria-controls'));

            tab.tabIndex = -1;
            tab.setAttribute('aria-selected', 'false');
            this.tab_panels.push(tabpanel);

            tab.addEventListener('keydown', this.keydown.bind(this));
            tab.addEventListener('click', this.click.bind(this));

            if (!this.first_tab) {
                this.first_tab = tab;
            }
            this.last_tab = tab;
        }

        this.set_tab(this.first_tab, false);
    }

    private set_tab(current_tab: HTMLElement, set_focus?: boolean = true): void {
        for (var i = 0; i < this.tabs.length; i += 1) {
            var tab = this.tabs[i];
            if (current_tab === tab) {
                tab.setAttribute('aria-selected', 'true');
                tab.removeAttribute('tabindex');
                this.tab_panels[i].setAttribute('aria-hidden', 'false');
                if (set_focus) {
                    tab.focus();
                }
            } else {
                tab.setAttribute('aria-selected', 'false');
                tab.tabIndex = -1;
                this.tab_panels[i].setAttribute('aria-hidden', 'true');
            }
        }
    }

    private set_to_previous_tab(current_tab: HTMLElement): void {
        let index: number;

        if (current_tab === this.first_tab) {
            this.set_tab(this.last_tab);
        } else {
            index = this.tabs.indexOf(current_tab);
            this.set_tab(this.tabs[index - 1]);
        }
    }

    private set_to_next_tab(current_tab: HTMLElement): void {
        let index: number;

        if (current_tab === this.last_tab) {
            this.set_tab(this.first_tab);
        } else {
            index = this.tabs.indexOf(current_tab);
            this.set_tab(this.tabs[index + 1]);
        }
    }

    /* Events */

    private keydown(event): void {
        const target = event.currentTarget;
        let flag = false;

        switch (event.key) {
            case 'ArrowLeft':
                this.set_to_previous_tab(target);
            flag = true;
            break;

            case 'ArrowRight':
                this.set_to_next_tab(target);
            flag = true;
            break;

            case 'Home':
                this.set_tab(this.first_tab);
            flag = true;
            break;

            case 'End':
                this.set_tab(this.last_tab);
            flag = true;
            break;

            default:
                break;
        }

        if (flag) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    private click(event): void {
        this.set_tab(event.currentTarget);
    }

}

