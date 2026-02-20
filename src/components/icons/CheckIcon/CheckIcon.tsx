import * as React from 'react'
import Icon, { type IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = ({width = 24, height = 24, className, color, ...props}) => {
    return (
        <Icon width={width} height={height} className={className} {...props}>
            <path stroke={color == undefined ? 'inherit' : `var(--text-${color})`} 
            d="M4 11.6129L9.87755 18L20 7" strokeWidth={2}/>
        </Icon>

    )
}

export default CheckIcon;
