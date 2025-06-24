import {
    IconDefinition,
    faCog,
    faCube,
    faDisplay,
    faFan,
    faHdd,
    faMemory,
    faMicrochip,
    faPlug,
} from '@fortawesome/free-solid-svg-icons';

export type PcPartCategory =
    | 'CPU'
    | 'CPU Cooler'
    | 'Motherboard'
    | 'Memory'
    | 'Storage'
    | 'Video Card'
    | 'Case'
    | 'Power Supply'
    | 'PSU';

export const getPcPartCategoryIcon = (category: PcPartCategory): IconDefinition => {
    switch (category) {
        case 'CPU':
            return faMicrochip;
        case 'CPU Cooler':
            return faFan;
        case 'Motherboard':
            return faMemory;
        case 'Memory':
            return faMemory;
        case 'Storage':
            return faHdd;
        case 'Video Card':
            return faDisplay;
        case 'Case':
            return faCube;
        case 'Power Supply':
        case 'PSU':
            return faPlug;
        default:
            return faCog;
    }
};

export const getPcPartCategoryClass = (category: PcPartCategory): string => {
    switch (category) {
        case 'CPU':
            return 'cpu-icon';
        case 'CPU Cooler':
            return 'cooler-icon';
        case 'Motherboard':
            return 'motherboard-icon';
        case 'Memory':
            return 'memory-icon';
        case 'Storage':
            return 'storage-icon';
        case 'Video Card':
            return 'video-icon';
        case 'Case':
            return 'case-icon';
        case 'Power Supply':
        case 'PSU':
            return 'psu-icon';
        default:
            return 'cpu-icon';
    }
};
