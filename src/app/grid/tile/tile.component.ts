import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

import { BackgroundPossibilities, GridTileClickEvent, GridTileDimension } from '../definitions';
import { NumberValueAccessor } from '@angular/forms';
import { FilterService } from 'src/app/filter.service';

@Component({
    selector: `app-tile`,
    templateUrl: `./tile.component.html`,
    styleUrls: [`./tile.component.scss`]
})
export class TileComponent implements OnInit {

    constructor(private filterService: FilterService) { }
    public get classes(): string {
        return (
            `app-tile` +
            ` app-tile--xs-` +
            this.mobileSize +
            ` app-tile--sm-` +
            this.tabletSize +
            ` app-tile--md-` +
            this.mediumSize +
            ` app-tile--lg-` +
            this.largeSize +
            ` ` +
            this.backgroundColour
        );
    }

    @ViewChild(TemplateRef, { static: true })
    public implicitContent: TemplateRef<unknown> | null = null;

    /**
     * Optional data, that can be passed to the component.
     */
    @Input()
    public data: object | null = null;

    /**
     * Optional input to define the preferred size of the tile.
     * This can be a number, which defines the size in every device resolution,
     * or an object, which defines the size for each one resolution separately.
     */
    @Input()
    public preferredSize: number | GridTileDimension = 4;

    /**
     * EventEmitter for the `ClickEvent`.
     */
    @Output()
    public clicked: EventEmitter<GridTileClickEvent> = new EventEmitter<GridTileClickEvent>();

    /**
     * Property, which defines the size of the tile @Mobile
     */
    public mobileSize: number | null = null;

    /**
     * Property, which defines the size of the tile @Tablet
     */
    public tabletSize: number | null = null;

    /**
     * Property, which defines the size of the tile @Medium devices
     */
    public mediumSize: number | null = null;

    /**
     * Property, which defines the size of the tile @Large devices
     */
    public largeSize: number | null = null;

    /**
     * property which defines the background colour
     */
    public backgroundColour: string | BackgroundPossibilities = `backgroundGreen`;

    /**
     * OnInit method.
     * The preferred size for the tile will calculated.
     */
    public ngOnInit(): void {
        if (typeof this.preferredSize === `number`) {
            this.setLargeSize(this.preferredSize);
            this.setMediumSize(this.preferredSize);
            this.setTabletSize(this.preferredSize);
            this.setMobileSize(this.preferredSize);
        } else {
            const {
                mobile,
                tablet,
                medium,
                large
            }: { mobile?: number; tablet?: number; medium?: number; large?: number } = this.preferredSize;
            this.setMobileSize(mobile);
            this.setTabletSize(tablet);
            this.setMediumSize(medium);
            this.setLargeSize(large);
        }


    }

    /**
     * Function, that fires when the user clicks on the tile.
     *
     * @param event The source event on click.
     */
    public onClick(event: MouseEvent): void {
        this.clicked.emit({
            data: this.data,
            source: event
        });
    }

    /**
     * Function to set the size @Mobile
     *
     * @param size how great the tile should be
     */
    private setMobileSize(size = 4): void {
        if (size <= 4 && size >= 0) {
            this.mobileSize = size;
        } else {
            this.mobileSize = 4;
        }
    }

    /**
     * Function to set the size @Tablet
     *
     * @param size how great the tile should be
     */
    private setTabletSize(size = 4): void {
        if (size <= 8 && size >= 0) {
            this.tabletSize = size;
        } else {
            this.tabletSize = 8;
        }
    }

    /**
     * Function to set the size of the tile @Medium devices
     *
     * @param size how great the tile should be
     */
    private setMediumSize(size = 4): void {
        if (size <= 12 && size >= 0) {
            this.mediumSize = size;
        } else {
            this.mediumSize = 12;
        }
    }

    /**
     * Function to set the size of the tile @Large devices
     *
     * @param size how great the tile should be
     */
    private setLargeSize(size = 4): void {
        if (size <= 16 && size >= 0) {
            this.largeSize = size;
        } else {
            this.largeSize = 16;
        }
    }

    private setBackgroundColour(status: string): void {
        'hi'
        status
    }
}
  