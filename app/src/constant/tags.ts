import { TagColor } from "naive-ui/es/tag/src/common-props";

export const TAGS_COLOR = {
    NORMAL: 0,
    RED: 1,
    YELLOW: 2,
    GRAY: 3,
    BLUE: 4,
    GREEN: 5,
    PURPLE: 6,
    ORANGE: 7,
};

export const TAGS_COLOR_NAME = {
    [TAGS_COLOR.NORMAL]: '默认',
    [TAGS_COLOR.RED]: '红色',
    [TAGS_COLOR.YELLOW]: '黄色',
    [TAGS_COLOR.GRAY]: '灰色',
    [TAGS_COLOR.BLUE]: '蓝色',
    [TAGS_COLOR.GREEN]: '绿色',
    [TAGS_COLOR.PURPLE]: '紫色',
    [TAGS_COLOR.ORANGE]: '橙色'
};

export const TAGS_COLOR_VALUE: Record<valueof<typeof TAGS_COLOR>, TagColor> = {
    [TAGS_COLOR.NORMAL]: {
        color: '#e1e0e0',
        borderColor: '#8a8a8a',
        textColor: '#4a4a4a'
    },
    [TAGS_COLOR.RED]: {
        color: '#f8342933',
        borderColor: '#f83429',
        textColor: '#f83429',
    },
    [TAGS_COLOR.YELLOW]: {
        color: '#e7b40033',
        textColor: '#e7b400',
        borderColor: '#e7b400',
    },
    [TAGS_COLOR.GRAY]: {
        color: '#6e6e7333',
        textColor: '#6e6e73',
        borderColor: '#6e6e73'
    },
    [TAGS_COLOR.BLUE]: {
        color: '#0070f533',
        textColor: '#0070f5',
        borderColor: '#0070f5'
    },
    [TAGS_COLOR.GREEN]: {
        color: '#11b62a33',
        textColor: '#11b62a',
        borderColor: '#11b62a'
    },
    [TAGS_COLOR.PURPLE]: {
        color: '#9d49c733',
        textColor: '#9d49c7',
        borderColor: '#9d49c7'
    },
    [TAGS_COLOR.ORANGE]: {
        color: '#e77d0033',
        textColor: '#e77d00',
        borderColor: '#e77d00',
    }
}