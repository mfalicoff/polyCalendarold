import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { Button, Logo } from "@components";

interface classForm extends Record<string, any> {
    classAcr: string;
    theoryGroup: number;
    labGroup?: number;
}

export const ClassForm: React.FC = () => {
    const [classFields, setClassFields] = useState<classForm[]>([
        { classAcr: "", theoryGroup: 0, labGroup: 0 },
    ]);

    const handleFormChange = (
        index: number,
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const data = [...classFields];
        data[index][event.target.name] = event.target.value;
        setClassFields(data);
    };

    const addFields = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const newField: classForm = {
            classAcr: "",
            theoryGroup: 0,
            labGroup: 0,
        };
        setClassFields([...classFields, newField]);
    };

    const removeFields = (
        index: number,
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
        const data = [...classFields];
        data.splice(index, 1);
        setClassFields(data);
    };

    const submit = (event: SyntheticEvent) => {
        event.preventDefault();
        console.log("ok");
        console.log(classFields);
    };

    return (
        <div className="App">
            <form onSubmit={submit}>
                <div>
                    <input
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Sigle du cours"
                        readOnly
                    />
                    <input
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Theory Group"
                        readOnly
                    />
                    <input
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="labGroup"
                        placeholder="Lab Group"
                        readOnly
                    />
                </div>
                {classFields.map((input, index) => {
                    return (
                        <div key={index} className="py-3">
                            <input
                                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="classAcr"
                                placeholder="Sigle du cours"
                                value={input.classAcr}
                                onChange={(event) =>
                                    handleFormChange(index, event)
                                }
                            />
                            <input
                                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="theoryGroup"
                                placeholder="Theory Group"
                                value={input.theoryGroup}
                                onChange={(event) =>
                                    handleFormChange(index, event)
                                }
                            />
                            <input
                                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="labGroup"
                                placeholder="Lab Group"
                                value={input.labGroup}
                                onChange={(event) =>
                                    handleFormChange(index, event)
                                }
                            />
                            <Button
                                onClick={(event) => removeFields(index, event)}
                            >
                                Remove
                            </Button>
                        </div>
                    );
                })}
                <Button onClick={(event) => addFields(event)}>
                    Add More..
                </Button>
                <Button
                    onClick={(event) => submit(event)}
                    disabled={classFields.length < 1}
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};
