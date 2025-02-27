const didMetadataStructureTest_Map_Recursive = (didDocumentMetadata) => {
    it('7.3 Metadata Structure - ' +
       'The structure used to communicate this metadata MUST be a map of properties.', () => {
        expect(didDocumentMetadata).toBeInfraMap();
    });

    it('7.3 Metadata Structure - ' +
       'Each property name MUST be a string.', () => {
        Object.keys(didDocumentMetadata).forEach((property_name) => {
            expect(property_name).toBeString();
        });
    });

    it('7.3 Metadata Structure - ' +
       'Each property value MUST be a string, map, list, ordered set, boolean, or null.', () => {
        Object.keys(didDocumentMetadata).forEach((property_name) => {
            expect(didDocumentMetadata[property_name]).toBeDidDocumentPropertyValueType();
        });
    });

    it('7.3 Metadata Structure - ' +
       'The values within any complex data structures such as maps and lists ' +
       'MUST be one of these data types as well.', () => {
            Object.keys(didDocumentMetadata).forEach((property_name) => {
                if (typeof didDocumentMetadata[property_name] == "object") {
                    didMetadataStructureTest_r(didDocumentMetadata[property_name]);
                }
            });
        });

};

const didMetadataStructureTests = (suiteConfig) => {
    suiteConfig.dids.forEach((didExample) => {
        describe(didExample, () => {
            suiteConfig.supportedContentTypes.forEach((contentType) => {
                describe(contentType, () => {
                    const didDocumentMetadata = suiteConfig[didExample][contentType].didDocumentMetadata;
                    if (didDocumentMetadata) {
                        didMetadataStructureTest_Map_Recursive(didDocumentMetadata);

                        it('7.3 Metadata Structure - ' +
                           'The entire metadata structure MUST be serializable according to the JSON ' +
                           'serialization rules in the [INFRA] specification.', () => {
                            // Checking this by serialize/deserialize to/from JSON, then compare the result
                            var obj = {};
                            expect(() => {
                                obj = JSON.parse(JSON.stringify(didDocumentMetadata));
                            }).not.toThrow();
                            expect(didDocumentMetadata).toEqual(obj);
                        });

                        it.todo('7.3 Metadata Structure - ' +
                                'All metadata property definitions registered in the DID Specification Registries ' +
                                '[DID-SPEC-REGISTRIES] MUST define the value type, including any additional formats ' +
                                'or restrictions to that value (for example, a string formatted as a date or as a decimal integer).');

                    };
                });
            })
        });
    })
};

module.exports = { didMetadataStructureTests };
