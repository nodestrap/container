// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    PropEx,
}                           from '@cssfn/css-types'   // ts defs support for cssfn
import {
    // general types:
    SelectorCollection,
    
    
    
    // styles:
    createSheet,
    
    
    
    // compositions:
    composition,
    mainComposition,
    globalDef,
    imports,
    
    
    
    // layouts:
    layout,
    vars,
    children,
    nextSiblings,
    
    
    
    // rules:
    rules,
    variants,
    rule,
    noRule,
    atRoot,
}                           from '@cssfn/cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
}                           from '@cssfn/react-cssfn' // cssfn for react
import {
    createCssVar,
}                           from '@cssfn/css-var'     // Declares & retrieves *css variables* (css custom properties).
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)

// nodestrap utilities:
import {
    breakpoints,
    isScreenWidthAtLeast,
}                           from '@nodestrap/breakpoints'

// nodestrap components:
import {
    // hooks:
    OrientationRuleOptions,
    defaultBlockOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    
    usesBorderStroke,
    usesBorderRadius,
    expandBorderRadius,
    usesPadding,
    expandPadding,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from '@nodestrap/basic'



// hooks:

// layouts:

export const defaultOrientationRuleOptions = defaultBlockOrientationRuleOptions;


//#region containers
export interface ContainerVars {
    // borders:
    borderWidth            : any
    
    borderStartStartRadius : any
    borderStartEndRadius   : any
    borderEndStartRadius   : any
    borderEndEndRadius     : any
    
    
    
    // spacings:
    paddingInline          : any
    paddingBlock           : any
}
const [containerRefs, containerDecls] = createCssVar<ContainerVars>();

/**
 * Uses container.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents container definitions.
 */
export const usesContainer = () => {
    // dependencies:
    
    // borders:
    const [, borderStrokeRefs] = usesBorderStroke();
    const [, borderRadiusRefs] = usesBorderRadius();
    
    // spacings:
    const [, paddingRefs     ] = usesPadding();
    
    
    
    return [
        () => composition([
            vars({
                // borders:
                [containerDecls.borderWidth           ] : borderStrokeRefs.borderWidth,
                
                [containerDecls.borderStartStartRadius] : borderRadiusRefs.borderStartStartRadius,
                [containerDecls.borderStartEndRadius  ] : borderRadiusRefs.borderStartEndRadius,
                [containerDecls.borderEndStartRadius  ] : borderRadiusRefs.borderEndStartRadius,
                [containerDecls.borderEndEndRadius    ] : borderRadiusRefs.borderEndEndRadius,
                
                
                
                // spacings:
                [containerDecls.paddingInline]          : paddingRefs.paddingInline,
                [containerDecls.paddingBlock ]          : paddingRefs.paddingBlock,
            }),
        ]),
        containerRefs,
        containerDecls,
    ] as const;
};
//#endregion containers


// borders:
export interface BorderContainerOptions extends OrientationRuleOptions {
    itemsSelector? : SelectorCollection
}
export const usesBorderAsContainer = (options?: BorderContainerOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockSelector, orientationInlineSelector] = usesOrientationRule(options);
    const {
        itemsSelector = '*',
    } = options;
    
    
    
    // dependencies:
    
    // layouts:
    const [container, containerRefs, containerDecls   ] = usesContainer();
    
    // borders:
    const [         ,              , borderRadiusDecls] = usesBorderRadius();
    
    
    
    return composition([
        imports([
            // layouts:
            container(),
        ]),
        // layout({
        //     // borders:
        //     overflow : 'hidden', // clip the children at the rounded corners // bad idea, causing child's focus boxShadow to be clipped off
        // }),
        variants([
            !!orientationBlockSelector  && rule(orientationBlockSelector,  [
                layout({
                    // children:
                    ...children(itemsSelector, [
                        variants([
                            rule(':where(:first-child)', [ // :where(...) => zero specificity => easy to overwrite
                                vars({
                                    /*
                                        if the_current_element is a_child_of_container and also a_separator,
                                        the deleted `containerDecls.borderWidth` in separator must be pointed to container,
                                        so we can calculate the correct inner_borderRadius.
                                        
                                        that's why we set `!important` to the `containerDecls.borderWidth`.
                                    */
                                    [containerDecls.borderWidth           ] : 'inherit !important', // reads parent's prop
                                    
                                    [containerDecls.borderStartStartRadius] : 'inherit', // reads parent's prop
                                    [containerDecls.borderStartEndRadius  ] : 'inherit', // reads parent's prop
                                }),
                                layout({
                                    // borders:
                                    // add rounded corners on top:
                                    [borderRadiusDecls.borderStartStartRadius] : `calc(${containerRefs.borderStartStartRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    [borderRadiusDecls.borderStartEndRadius  ] : `calc(${containerRefs.borderStartEndRadius  } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    
                                    /* recursive calculation of borderRadius is not supported yet */
                                }),
                            ]),
                            rule(':where(:last-child)',  [ // :where(...) => zero specificity => easy to overwrite
                                vars({
                                    /*
                                        if the_current_element is a_child_of_container and also a_separator,
                                        the deleted `containerDecls.borderWidth` in separator must be pointed to container,
                                        so we can calculate the correct inner_borderRadius.
                                        
                                        that's why we set `!important` to the `containerDecls.borderWidth`.
                                    */
                                    [containerDecls.borderWidth           ] : 'inherit !important', // reads parent's prop
                                    
                                    [containerDecls.borderEndStartRadius  ] : 'inherit', // reads parent's prop
                                    [containerDecls.borderEndEndRadius    ] : 'inherit', // reads parent's prop
                                }),
                                layout({
                                    // borders:
                                    // add rounded corners on bottom:
                                    [borderRadiusDecls.borderEndStartRadius  ] : `calc(${containerRefs.borderEndStartRadius  } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    [borderRadiusDecls.borderEndEndRadius    ] : `calc(${containerRefs.borderEndEndRadius    } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    
                                    /* recursive calculation of borderRadius is not supported yet */
                                }),
                            ]),
                        ]),
                    ]),
                }),
            ]),
            !!orientationInlineSelector && rule(orientationInlineSelector, [
                layout({
                    // children:
                    ...children(itemsSelector, [
                        variants([
                            rule(':where(:first-child)', [ // :where(...) => zero specificity => easy to overwrite
                                vars({
                                    /*
                                        if the_current_element is a_child_of_container and also a_separator,
                                        the deleted `containerDecls.borderWidth` in separator must be pointed to container,
                                        so we can calculate the correct inner_borderRadius.
                                        
                                        that's why we set `!important` to the `containerDecls.borderWidth`.
                                    */
                                    [containerDecls.borderWidth           ] : 'inherit !important', // reads parent's prop
                                    
                                    [containerDecls.borderStartStartRadius] : 'inherit', // reads parent's prop
                                    [containerDecls.borderEndStartRadius  ] : 'inherit', // reads parent's prop
                                }),
                                layout({
                                    // borders:
                                    // add rounded corners on left:
                                    [borderRadiusDecls.borderStartStartRadius] : `calc(${containerRefs.borderStartStartRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    [borderRadiusDecls.borderEndStartRadius  ] : `calc(${containerRefs.borderEndStartRadius  } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    
                                    /* recursive calculation of borderRadius is not supported yet */
                                }),
                            ]),
                            rule(':where(:last-child)',  [ // :where(...) => zero specificity => easy to overwrite
                                vars({
                                    /*
                                        if the_current_element is a_child_of_container and also a_separator,
                                        the deleted `containerDecls.borderWidth` in separator must be pointed to container,
                                        so we can calculate the correct inner_borderRadius.
                                        
                                        that's why we set `!important` to the `containerDecls.borderWidth`.
                                    */
                                    [containerDecls.borderWidth           ] : 'inherit !important', // reads parent's prop
                                    
                                    [containerDecls.borderStartEndRadius  ] : 'inherit', // reads parent's prop
                                    [containerDecls.borderEndEndRadius    ] : 'inherit', // reads parent's prop
                                }),
                                layout({
                                    // borders:
                                    // add rounded corners on right:
                                    [borderRadiusDecls.borderStartEndRadius  ] : `calc(${containerRefs.borderStartEndRadius  } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    [borderRadiusDecls.borderEndEndRadius    ] : `calc(${containerRefs.borderEndEndRadius    } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    
                                    /* recursive calculation of borderRadius is not supported yet */
                                }),
                            ]),
                        ]),
                    ]),
                }),
            ]),
            (!orientationBlockSelector  && !orientationInlineSelector) && noRule([
                layout({
                    // children:
                    ...children(itemsSelector, [
                        vars({
                            /*
                                if the_current_element is a_child_of_container and also a_separator,
                                the deleted `containerDecls.borderWidth` in separator must be pointed to container,
                                so we can calculate the correct inner_borderRadius.
                                
                                that's why we set `!important` to the `containerDecls.borderWidth`.
                            */
                            [containerDecls.borderWidth           ] : 'inherit !important', // reads parent's prop
                            
                            [containerDecls.borderStartStartRadius] : 'inherit', // reads parent's prop
                            [containerDecls.borderStartEndRadius  ] : 'inherit', // reads parent's prop
                            [containerDecls.borderEndStartRadius  ] : 'inherit', // reads parent's prop
                            [containerDecls.borderEndEndRadius    ] : 'inherit', // reads parent's prop
                        }),
                        layout({
                            // borders:
                            
                            // add rounded corners on top:
                            [borderRadiusDecls.borderStartStartRadius] : `calc(${containerRefs.borderStartStartRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                            [borderRadiusDecls.borderStartEndRadius  ] : `calc(${containerRefs.borderStartEndRadius  } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                            
                            // add rounded corners on bottom:
                            [borderRadiusDecls.borderEndStartRadius  ] : `calc(${containerRefs.borderEndStartRadius  } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                            [borderRadiusDecls.borderEndEndRadius    ] : `calc(${containerRefs.borderEndEndRadius    } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                            
                            /* recursive calculation of borderRadius is not supported yet */
                        }),
                    ]),
                }),
            ]),
        ]),
    ]);
};


export interface BorderSeparatorOptions {
    itemsSelector? : SelectorCollection
    swapFirstItem? : boolean
}
const usesBorderAsSeparator = (block: boolean, options: BorderSeparatorOptions = {}) => {
    // options:
    const {
        itemsSelector = '*',
        swapFirstItem = false,
    } = options;
    
    
    
    // dependencies:
    
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    // layouts:
    const [, , containerDecls   ] = usesContainer();
    
    
    
    return composition([
        vars({
            /*
                if the_current_element is a container,
                the `containerDecls.borderWidth` will be deleted (not follows `borderWidth`),
                because the_current_element becomes a separator.
                
                use `0px` instead of 0,
                because the value will be calculated in `calc()` expression.
            */
            [containerDecls.borderWidth] : '0px',
        }),
        layout({
            // shadows:
            boxShadow                    : undefined, // remove shadow
        }),
        
        // removes unecessary border stroke:
        layout({
            // borders:
            [`border${block ? 'Inline' : 'Block'}Width`] : 0, // remove (left|right)-border
            
            
            
            // children:
            // remove double border by removing top-border at the subsequent sibling(s)
            ...nextSiblings(itemsSelector, [
                variants([
                    rule((swapFirstItem ? ':where(:not(:nth-child(2)))' : '&'), [ // *note : move the first separator to the second child
                        layout({
                            // borders:
                            [`border${block ? 'Block' : 'Inline'}StartWidth`] : 0, // remove top-border
                        }),
                    ]),
                ]),
            ]),
        }),
        variants([
            // remove top-border at the first-child, so that it wouldn't collide with the container's top-border
            rule(':where(:first-child)', [ // :where(...) => zero specificity => easy to overwrite
                layout({
                    // borders:
                    [`border${block ? 'Block' : 'Inline'}StartWidth`] : 0, // remove top-border
                }),
            ]),
            
            // remove bottom-border at the last-child, so that it wouldn't collide with the container's bottom-border
            // *note : `:first-child` => move the first separator to the second child
            rule([':where(:last-child)', (swapFirstItem && ':where(:first-child)')],  [ // :where(...) => zero specificity => easy to overwrite
                layout({
                    // borders:
                    [`border${block ? 'Block' : 'Inline'}EndWidth`  ] : 0, // remove top-border
                }),
            ]),
        ]),
        
        // removes unecessary border radius:
        // although the border stroke was/not removed, it *affects* the children's border radius
        // do not remove border radius at the parent's corners (:first-child & :last-child)
        variants([
            rule(':where(:not(:first-child))', [ // :where(...) => zero specificity => easy to overwrite
                layout({
                    // borders:
                    // remove rounded corners on top:
                    [borderRadiusDecls.borderStartStartRadius] : '0px',
                    [borderRadiusDecls.borderStartEndRadius  ] : '0px',
                }),
            ]),
            rule(':where(:not(:last-child))', [ // :where(...) => zero specificity => easy to overwrite
                layout({
                    // borders:
                    // remove rounded corners on bottom:
                    [borderRadiusDecls.borderEndStartRadius  ] : '0px',
                    [borderRadiusDecls.borderEndEndRadius    ] : '0px',
                }),
            ]),
        ]),
    ]);
};
export const usesBorderAsSeparatorBlock  = (options: BorderSeparatorOptions = {}) => usesBorderAsSeparator(true, options);
export const usesBorderAsSeparatorInline = (options: BorderSeparatorOptions = {}) => usesBorderAsSeparator(false, options);



// styles:
/**
 * Applies a responsive container layout.
 * @returns A `Style` represents a responsive container layout.
 */
export const usesResponsiveContainerLayout = () => {
    return composition([
        layout({
            // borders:
            ...expandBorderRadius(cssProps), // expand borderRadius css vars
            
            
            
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
            display             : 'grid', // use css grid for layouting
            // define our logical paddings:
            gridTemplateRows    : [[paddingRefs.paddingBlock,  'auto', paddingRefs.paddingBlock ]], // the height of each row
            gridTemplateColumns : [[paddingRefs.paddingInline, 'auto', paddingRefs.paddingInline]], // the width of each column
            gridTemplateAreas   : [[
                '"........... blockStart ........."',
                '"inlineStart  content   inlineEnd"',
                '"...........  blockEnd  ........."',
            ]],
            
            
            
            // borders:
            ...expandBorderRadius(cssProps), // expand borderRadius css vars
            
            
            
            // spacings:
            ...expandPadding(cssProps), // expand padding css vars
            // since we use grid as paddings, so the css paddings are no longer needed:
            paddingInline : undefined as unknown as null, // turn off physical padding, use logical padding we've set above
            paddingBlock  : undefined as unknown as null, // turn off physical padding, use logical padding we've set above
        }),
    ]);
};

export const usesContainerFill = () => {
    // spacings:
    const [, containerRefs]     = usesContainer();
    const positivePaddingInline = containerRefs.paddingInline;
    const positivePaddingBlock  = containerRefs.paddingBlock;
    const negativePaddingInline = `calc(0px - ${positivePaddingInline})`;
    const negativePaddingBlock  = `calc(0px - ${positivePaddingBlock })`;
    
    
    
    const fillSelfSelector = '.fill-self';
    const fillSelector     = ['.fill', fillSelfSelector];
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
                    boxSizing      : 'border-box', // the final size is including borders & paddings
                    inlineSize     : 'fill-available',
                    fallbacks      : {
                        inlineSize : `calc(100% + (${positivePaddingInline} * 2))`,
                    },
                    
                    
                    
                    // spacings:
                    marginInline   : negativePaddingInline, // cancel out parent's padding with negative margin
                }),
                variants([
                    rule(':where(:first-child)', [ // :where(...) => zero specificity => easy to overwrite
                        layout({
                            // spacings:
                            marginBlockStart : negativePaddingBlock, // cancel out parent's padding with negative margin
                        }),
                    ]),
                    rule(':where(:last-child)',  [ // :where(...) => zero specificity => easy to overwrite
                        layout({
                            // spacings:
                            marginBlockEnd   : negativePaddingBlock, // cancel out parent's padding with negative margin
                        }),
                    ]),
                ]),
            ]),
            ...children(fillSelfSelector, [
                layout({
                    ...children('*', [ // * => zero specificity => easy to overwrite
                        layout({
                            // spacings:
                            paddingInline : positivePaddingInline, // restore parent's padding with positive margin
                        }),
                    ]),
                }),
                variants([
                    rule(':where(:first-child)', [ // :where(...) => zero specificity => easy to overwrite
                        layout({
                            ...children('*', [ // * => zero specificity => easy to overwrite
                                layout({
                                    // spacings:
                                    paddingBlockStart : positivePaddingBlock, // restore parent's padding with positive margin
                                }),
                            ]),
                        }),
                    ]),
                    rule(':where(:last-child)',  [ // :where(...) => zero specificity => easy to overwrite
                        layout({
                            ...children('*', [ // * => zero specificity => easy to overwrite
                                layout({
                                    // spacings:
                                    paddingBlockEnd   : positivePaddingBlock, // restore parent's padding with positive margin
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
], /*sheetId :*/'dmgepbofol'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region borders
        borderWidth  : 0, // strip out Basic's border
        borderRadius : 0, // strip out Basic's borderRadius
        //#endregion borders
        
        
        
        //#region spacings
        paddingInline    : '12px' as PropEx.Length,
        paddingBlock     :  '9px' as PropEx.Length,
    
        paddingInlineSm  : '24px' as PropEx.Length,
        paddingBlockSm   : '18px' as PropEx.Length,
    
        paddingInlineMd  : '36px' as PropEx.Length,
        paddingBlockMd   : '27px' as PropEx.Length,
    
        paddingInlineLg  : '48px' as PropEx.Length,
        paddingBlockLg   : '36px' as PropEx.Length,
    
        paddingInlineXl  : '60px' as PropEx.Length,
        paddingBlockXl   : '45px' as PropEx.Length,
    
        paddingInlineXxl : '72px' as PropEx.Length,
        paddingBlockXxl  : '54px' as PropEx.Length,
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



// react components:

export interface ContainerProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicProps<TElement>
{
    // children:
    children? : React.ReactNode
}
export function Container<TElement extends HTMLElement = HTMLElement>(props: ContainerProps<TElement>) {
    // styles:
    const sheet = useContainerSheet();
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...props}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        />
    );
}
export { Container as default }
