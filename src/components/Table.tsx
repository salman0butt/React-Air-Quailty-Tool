import React from "react";
import { Table as SemanticUiTable } from "semantic-ui-react";
// CityInterface
interface CityInterface {
    cityName: string;
    airQuality: number;
}

// props passed to table component
interface Props {
    city1: CityInterface;
    city2: CityInterface;
    comparisonResult: any;
}

const Table: React.FC<Props> = ({city1, city2, comparisonResult = "" }) => {
    // check if city1, city2 and there name exist also check if there is some comparison results
    return (city1 && city2 && city1.cityName && city2.cityName &&  comparisonResult ? (
            <SemanticUiTable>
                <SemanticUiTable.Header>
                    <SemanticUiTable.Row>
                        <SemanticUiTable.HeaderCell>City</SemanticUiTable.HeaderCell>
                        <SemanticUiTable.HeaderCell>Air Quality</SemanticUiTable.HeaderCell>
                    </SemanticUiTable.Row>
                </SemanticUiTable.Header>
                <SemanticUiTable.Body>
                    <SemanticUiTable.Row>
                        {/* show city1 name */}
                        <SemanticUiTable.Cell>{city1.cityName}</SemanticUiTable.Cell>
                         {/* show city1 air Quality */}
                        <SemanticUiTable.Cell>
                            {city1.airQuality}
                        </SemanticUiTable.Cell>
                    </SemanticUiTable.Row>
                    <SemanticUiTable.Row>
                         {/* show city1\2 name */}
                        <SemanticUiTable.Cell>{city2.cityName}</SemanticUiTable.Cell>
                        {/* show city2 air Quality */}
                        <SemanticUiTable.Cell>
                            {city2.airQuality}
                        </SemanticUiTable.Cell>
                    </SemanticUiTable.Row>
                    <SemanticUiTable.Row>
                        <SemanticUiTable.Cell>Comparison</SemanticUiTable.Cell>
                        {/* show comparisonResult */}
                        <SemanticUiTable.Cell>
                            {comparisonResult}
                        </SemanticUiTable.Cell>
                    </SemanticUiTable.Row>
                </SemanticUiTable.Body>
            </SemanticUiTable>
        ) : null
    );

}

export default Table;