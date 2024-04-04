export class PerspectiveTokenScaler {

    static handleUpdate(token, change) {
        if (token instanceof TokenDocument && (change.x || change.y)) {
            let currentScene = game.scenes.viewed
            let starterData = currentScene.drawings.filter(d => d.text === 'scaler_start')?.[0]
            let limiterData = currentScene.drawings.filter(d => d.text === 'scaler_limit')?.[0]

            if (typeof starterData !== 'undefined' && typeof limiterData !== 'undefined') {
                let xDiffMax = limiterData.x - starterData.x
                let yDiffMax = limiterData.y - starterData.y
                let maxDistance = Math.sqrt(xDiffMax * xDiffMax + yDiffMax * yDiffMax)

                let xDiffCurrent = limiterData.x - (change.x ? change.x : 0)
                let yDiffCurrent = limiterData.y - (change.y ? change.y : 0)
                let distance = Math.sqrt(xDiffCurrent * xDiffCurrent + yDiffCurrent * yDiffCurrent)
                let factor = distance > maxDistance ? 1 : distance / maxDistance
                change.scale = factor < 0.25 ? 0.25 : factor
            }
        }
    }
}
