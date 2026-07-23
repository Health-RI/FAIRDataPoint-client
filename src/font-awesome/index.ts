import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as far from '@fortawesome/free-regular-svg-icons'
import * as fas from '@fortawesome/free-solid-svg-icons'
import type { App } from 'vue'

library.add(far.faTrashCan)
library.add(fas.faAnglesDown)
library.add(fas.faAngleDown)
library.add(fas.faAnglesLeft)
library.add(fas.faAnglesRight)
library.add(fas.faAnglesUp)
library.add(fas.faAngleLeft)
library.add(fas.faAngleRight)
library.add(far.faSquareCheck)
library.add(fas.faChevronDown)
library.add(fas.faChevronRight)
library.add(fas.faChevronUp)
library.add(fas.faGear)
library.add(fas.faGears)
library.add(fas.faDownload)
library.add(fas.faPenToSquare)
library.add(fas.faEllipsisVertical)
library.add(fas.faUpRightFromSquare)
library.add(fas.faFileExport)
library.add(fas.faCircleInfo)
library.add(fas.faKey)
library.add(fas.faPlus)
library.add(fas.faDiagramProject)
library.add(fas.faMagnifyingGlass)
library.add(fas.faRightToBracket)
library.add(fas.faRightFromBracket)
library.add(fas.faSitemap)
library.add(fas.faShapes)
library.add(fas.faSpinner)
library.add(far.faSquare)
library.add(fas.faRotate)
library.add(fas.faXmark)
library.add(fas.faTrash)
library.add(fas.faUserPen)
library.add(fas.faUserGroup)
library.add(fas.faUserPlus)
library.add(fas.faUserSlash)

export const registerFontAwesome = (app: App) => {
  app.component('Fa', FontAwesomeIcon)
}
