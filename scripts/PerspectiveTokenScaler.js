export class PerspectiveTokenScaler {

    static handleUpdate(token, change) {
        if (token instanceof TokenDocument && change.x && change.y) {
            let currentScene = game.scenes.viewed
            let starterData = currentScene.drawings.filter(d => d.data.text === 'starter')?.[0]?.data
            let limiterData = currentScene.drawings.filter(d => d.data.text === 'limiter')?.[0]?.data
            let maxDistance = 0

            if (typeof starterData !== 'undefined' && typeof limiterData !== 'undefined') {
                let xDiff = limiterData.x - starterData.x
                let yDiff = limiterData.y - starterData.y
                maxDistance = Math.sqrt(xDiff * xDiff + yDiff * yDiff)
            }

            let xDiff = limiterData.x - change.x
            let yDiff = limiterData.y - change.y
            let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff)
            let factor = distance > maxDistance ? 1 : distance / maxDistance
            change.scale = factor < 0.25 ? 0.25 : factor
        }
    }
}
