import {PerspectiveTokenScaler} from "./PerspectiveTokenScaler.js"

Hooks.on('preUpdateToken', PerspectiveTokenScaler.handleUpdate)
