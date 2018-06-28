export const asteroidSVG = (rock) => `
  <svg height="${2 * rock.r}" width="${2 * rock.r}" id="${rock.id}" class="rock" style="margin-left:-${rock.r}px;margin-top:-${rock.r}px" viewbox="-${rock.r} -${rock.r} ${2 * rock.r} ${2 * rock.r}">
    <circle cx="0" cy="0" r="${rock.r-1}" stroke="black" stroke-width="1" fill="black" />
  </svg>`

export const shipSVG = () => `
<svg id="ship" class="" width="13px" height="12px" viewBox="0 0 13 12" version="1.1">
</svg>
`
