export const asteroidSVG = (rock) => `
  <svg height="${2 * rock.r}" width="${2 * rock.r}" style="margin-left:-${rock.r}px;margin-top:-${rock.r}px" viewbox="-${rock.r} -${rock.r} ${2 * rock.r} ${2 * rock.r}">
    <circle cx="0" cy="0" r="${rock.r-1}" stroke="black" stroke-width="1" fill="black" />
   	<circle cx="0" cy="15" r="4" stroke="blue" stroke-width="1" fill="blue" />
 </svg>`

export const shipSVG = () => `
<svg id="ship" class="ship" width="12px" height="12px" viewBox="0 0 12 12" version="1.1">
	<path id="ship" d="M6,0 L12,12 L6,6 L0,12 L6,0 Z" fill="#F5A623" fill-rule="nonzero"></path>
	<path id="thrust" d="M6,8 L7,11 L5,11 L6,8 Z" fill="#F5A6E3" fill-rule="nonzero"></path>
</svg>
`

export const bulletSVG = (bullet) => `
<svg height="${2 * bullet.r}" width="${2 * bullet.r}" id="${bullet.id}" class="bullet" style="margin-left:-${bullet.r}px;margin-top:-${bullet.r}px" viewbox="-${bullet.r} -${bullet.r} ${2 * bullet.r} ${2 * bullet.r}">
  <circle cx="0" cy="0" r="${bullet.r}" stroke="black" stroke-width="1" fill="black" />
</svg>
`
