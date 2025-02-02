import type { HighlightUnprocessed, StepCodeHighlight } from "./types";

export function parseHighlight(codeData: string, highlight: HighlightUnprocessed): StepCodeHighlight[] {

    let highlights = []

    let lLen = -1;
    let lines = []

    switch (highlight.type) {
        case 'line':
            if (highlight.line == undefined) {
                console.error("Couldn't parse step of type 'line'");
                break;
            }

            lines = codeData.split('\n');

            if (!lines || lines.length == 0) {
                lLen = codeData.length
                highlights.push({
                    start: 0,
                    end: lLen,
                    line: highlight.line,
                    highlightType: highlight.highlightType
                })
            } else {
                lLen = lines[highlight.line].length
                highlights.push({
                    start: 0,
                    end: lLen,
                    line: highlight.line,
                    highlightType: highlight.highlightType
                })
            }

            break;
        case 'range':

            if (highlight.line == undefined || highlight.start == undefined || highlight.end == undefined) {
                console.error("Couldn't parse step of type 'range'");
                break;
            }

            highlights.push({
                start: highlight.start,
                end: highlight.end,
                line: highlight.line,
                highlightType: highlight.highlightType
            })

            break;
        case 'regex':

            if (highlight.regex == undefined) {
                console.error("Couldn't parse step of type 'range'");
                break;
            }

            lines = codeData.split('\n');
            for (let i = 0; i < lines.length; i++) {
                const l = lines[i];

                let match;
                const regex = new RegExp(highlight.regex, "g")
                while ((match = regex.exec(l)) != null) {
                    highlights.push({
                        line: i,
                        highlightType: highlight.highlightType,
                        start: match.index,
                        end: match.index + match[0].length
                    })
                }

            }

            break;
    }

    return highlights;
}