import {diagramToMd} from "./diagramToMd.ts"
import {diagram as iamPolDia} from "./iam_policies/diagram.js";

diagramToMd(iamPolDia, "./iam_policies/description.md")
