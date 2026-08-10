import type {ButtonHTMLAttributes} from 'react'; export function Button({variant='primary',...props}:{variant?:'primary'|'ghost'}&ButtonHTMLAttributes<HTMLButtonElement>){return <button className={`btn btn-${variant}`} {...props}/>}

