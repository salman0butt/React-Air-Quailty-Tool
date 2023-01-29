import React from "react";
import { Table as SemanticUiTable } from "semantic-ui-react";

interface CityInterface {
    cityName: string;
    airQuality: number;
}

interface Props {
    city1: CityInterface;
    city2: CityInterface;
    comparisonResult: any;
}

const Table: React.FC<Props> = ({city1, city2, comparisonResult = "" }) => {
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
                        <SemanticUiTable.Cell>{city1.cityName}</SemanticUiTable.Cell>
                        <SemanticUiTable.Cell>
                            {city1.airQuality}
                        </SemanticUiTable.Cell>
                    </SemanticUiTable.Row>
                    <SemanticUiTable.Row>
                        <SemanticUiTable.Cell>{city2.cityName}</SemanticUiTable.Cell>
                        <SemanticUiTable.Cell>
                            {city2.airQuality}
                        </SemanticUiTable.Cell>
                    </SemanticUiTable.Row>
                    <SemanticUiTable.Row>
                        <SemanticUiTable.Cell>Comparison</SemanticUiTable.Cell>
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