// react:
import { default as React, } from 'react'; // base technology of our nodestrap components
import { 
// styles:
createSheet, 
// compositions:
composition, mainComposition, globalDef, imports, 
// layouts:
layout, children, 
// rules:
rules, variants, rule, atRoot, } from '@cssfn/cssfn'; // cssfn core
import { 
// hooks:
createUseSheet, } from '@cssfn/react-cssfn'; // cssfn for react
import { createCssConfig, 
// utilities:
usesGeneralProps, usesSuffixedProps, overwriteProps, } from '@cssfn/css-config'; // Stores & retrieves configuration using *css custom properties* (css variables)
// nodestrap utilities:
import { breakpoints, isScreenWidthAtLeast, } from '@nodestrap/breakpoints';
// nodestrap components:
import { 
// hooks:
expandBorderRadius, usesPadding, expandPadding, 
// styles:
usesBasicLayout, usesBasicVariants, Basic, } from '@nodestrap/basic';
import { 
// hooks:
usesContainer, usesBorderAsContainer, } from '@nodestrap/content';
// styles:
/**
 * Applies a responsive container layout.
 * @returns A `Style` represents a responsive container layout.
 */
export const usesResponsiveContainerLayout = () => {
    return composition([
        layout({
            // borders:
            ...expandBorderRadius(cssProps),
            // spacings:
            ...expandPadding(cssProps), // expand padding css vars
        }),
    ]);
};
/**
 * Applies a responsive container using grid layout.
 * @returns A `Style` represents a responsive container using grid layout.
 */
export const usesResponsiveContainerGridLayout = () => {
    // dependencies:
    // spacings:
    const [, paddingRefs] = usesPadding();
    return composition([
        layout({
            // layouts:
            display: 'grid',
            // define our logical paddings:
            gridTemplateRows: [[paddingRefs.paddingBlock, 'auto', paddingRefs.paddingBlock]],
            gridTemplateColumns: [[paddingRefs.paddingInline, 'auto', paddingRefs.paddingInline]],
            gridTemplateAreas: [[
                    '"........... blockStart ........."',
                    '"inlineStart  content   inlineEnd"',
                    '"...........  blockEnd  ........."',
                ]],
            // borders:
            ...expandBorderRadius(cssProps),
            // spacings:
            ...expandPadding(cssProps),
            // since we use grid as paddings, so the css paddings are no longer needed:
            paddingInline: undefined,
            paddingBlock: undefined, // turn off physical padding, use logical padding we've set above
        }),
    ]);
};
export const usesContainerFill = () => {
    // spacings:
    const [, containerRefs] = usesContainer();
    const positivePaddingInline = containerRefs.paddingInline;
    const positivePaddingBlock = containerRefs.paddingBlock;
    const negativePaddingInline = `calc(0px - ${positivePaddingInline})`;
    const negativePaddingBlock = `calc(0px - ${positivePaddingBlock})`;
    const fillSelfSelector = '.fill-self';
    const fillSelector = ['.fill', fillSelfSelector];
    return composition([
        imports([
            // borders:
            usesBorderAsContainer({ itemsSelector: fillSelector }), // make a nicely rounded corners
        ]),
        layout({
            // children:
            ...children(fillSelector, [
                layout({
                    // sizes:
                    // span to maximum width including parent's paddings:
                    boxSizing: 'border-box',
                    inlineSize: 'fill-available',
                    fallbacks: {
                        inlineSize: `calc(100% + (${positivePaddingInline} * 2))`,
                    },
                    // spacings:
                    marginInline: negativePaddingInline, // cancel out parent's padding with negative margin
                }),
                variants([
                    rule(':where(:first-child)', [
                        layout({
                            // spacings:
                            marginBlockStart: negativePaddingBlock, // cancel out parent's padding with negative margin
                        }),
                    ]),
                    rule(':where(:last-child)', [
                        layout({
                            // spacings:
                            marginBlockEnd: negativePaddingBlock, // cancel out parent's padding with negative margin
                        }),
                    ]),
                ]),
            ]),
            ...children(fillSelfSelector, [
                layout({
                    ...children('*', [
                        layout({
                            // spacings:
                            paddingInline: positivePaddingInline, // restore parent's padding with positive margin
                        }),
                    ]),
                }),
                variants([
                    rule(':where(:first-child)', [
                        layout({
                            ...children('*', [
                                layout({
                                    // spacings:
                                    paddingBlockStart: positivePaddingBlock, // restore parent's padding with positive margin
                                }),
                            ]),
                        }),
                    ]),
                    rule(':where(:last-child)', [
                        layout({
                            ...children('*', [
                                layout({
                                    // spacings:
                                    paddingBlockEnd: positivePaddingBlock, // restore parent's padding with positive margin
                                }),
                            ]),
                        }),
                    ]),
                ]),
            ]),
        }),
    ]);
};
export const usesContainerLayout = () => {
    return composition([
        imports([
            // layouts:
            usesBasicLayout(),
        ]),
        layout({
            // layouts:
            display: 'block',
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
        imports([
            // layouts:
            usesResponsiveContainerLayout(),
        ]),
    ]);
};
export const usesContainerVariants = () => {
    return composition([
        imports([
            // variants:
            usesBasicVariants(),
        ]),
    ]);
};
export const useContainerSheet = createUseSheet(() => [
    mainComposition([
        imports([
            // fills:
            usesContainerFill(),
            // layouts:
            usesContainerLayout(),
            // variants:
            usesContainerVariants(),
        ]),
    ]),
], /*sheetId :*/ 'dmgepbofol'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names
// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region borders
        borderWidth: 0,
        borderRadius: 0,
        //#endregion borders
        //#region spacings
        paddingInline: '12px',
        paddingBlock: '9px',
        paddingInlineSm: '24px',
        paddingBlockSm: '18px',
        paddingInlineMd: '36px',
        paddingBlockMd: '27px',
        paddingInlineLg: '48px',
        paddingBlockLg: '36px',
        paddingInlineXl: '60px',
        paddingBlockXl: '45px',
        paddingInlineXxl: '72px',
        paddingBlockXxl: '54px',
        //#endregion spacings
    };
}, { prefix: 'con' });
// create a new styleSheet & attach:
createSheet(() => [
    globalDef([
        // the container size is determined by screen width:
        Object.keys(breakpoints)
            .map((breakpointName) => isScreenWidthAtLeast(breakpointName, [
            rules([
                atRoot([
                    layout({
                        // overwrites propName = propName{BreakpointName}:
                        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, breakpointName)),
                    }),
                ]),
            ], { minSpecificityWeight: 2 }),
        ])),
    ]),
])
    .attach();
export function Container(props) {
    // styles:
    const sheet = useContainerSheet();
    // jsx:
    return (React.createElement(Basic, { ...props, 
        // variants:
        mild: props.mild ?? true, 
        // classes:
        mainClass: props.mainClass ?? sheet.main }));
}
export { Container as default };
