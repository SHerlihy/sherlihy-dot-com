import {
    CloudFrontLogPayload,
	columnOrder
} from "../definitions.ts"

type Props = {
} & CloudFrontLogPayload

function AccessLogRow(props: Props){
	return (
		<tr>
		{
			columnOrder.map(({objKey}) => {
				return <td>{props[objKey]}</td>
			})
		}
		</tr>
	)
}

export default AccessLogRow
