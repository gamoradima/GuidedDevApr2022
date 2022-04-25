define("UsrRealty1Page", [], function() {
	return {
		entitySchemaName: "UsrRealty",
		attributes: {
            "UsrCommissionUSD": {
                /* Тип данных колонки модели представления. */
                //dataValueType: Terrasoft.DataValueType.FLOAT,
                /* Массив конфигурационных объектов, которые определяют зависимости колонки [UsrCommissionUSD]. */
                dependencies: [
                    {
                        /* Значение колонки [UsrCommissionUSD] зависит от значений колонок [UsrPriceUSD] и [UsrOfferType]. */
                        columns: ["UsrPriceUSD", "UsrOfferType"],
                        /* Метод-обработчик, который вызывается при изменении значения одной из колонок [UsrPriceUSD] и [UsrOfferType]. */
                        methodName: "calculateCommission"
                    }
                ]
            },
			"UsrOfferType": {
				lookupListConfig: {
					columns: ["UsrCoeff"]
				}
			},
			"UsrCommissionVirtual": {
                dataValueType: Terrasoft.DataValueType.FLOAT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: 0
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "UsrRealtyFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "UsrRealty"
				}
			},
			"UsrSchemaaf0ce1a3Detaile0771625": {
				"schemaName": "UsrRealtyVisitDetailGrid",
				"entitySchemaName": "UsrRealtyVisit",
				"filter": {
					"detailColumn": "UsrRealty",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"UsrComment": {
				"5947f7e3-3519-4276-bd3a-b6e81e15f834": {
					"uId": "5947f7e3-3519-4276-bd3a-b6e81e15f834",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrType"
							}
						},
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrOfferType"
							}
						}
					]
				}
			},
			"UsrCity": {
				"04a54e32-88bc-4215-9beb-c174dc8b2140": {
					"uId": "04a54e32-88bc-4215-9beb-c174dc8b2140",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "Country",
					"comparisonType": 3,
					"autoClean": true,
					"autocomplete": true,
					"type": 1,
					"attribute": "UsrCountry"
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			setValidationConfig: function() {
                /* Вызывает инициализацию валидаторов родительской модели представления. */
                this.callParent(arguments);
                /* Для колонки [UsrPriceUSD] добавляется метод-валидатор positiveValueValidator(). */
                this.addColumnValidator("UsrPriceUSD", this.positiveValueValidator);
                this.addColumnValidator("UsrAreaM2", this.positiveValueValidator);
            },
			positiveValueValidator: function(value, column) {
				var msg = "";
				if (value < 0) {
					msg = this.get("Resources.Strings.ValueMustBePositive");
				}
				return {
					invalidMessage: msg
				};
			},
			calculateCommission: function() {
				var price = this.get("UsrPriceUSD");
				if (!price) {
					price = 0;
				}
				var offerTypeObject = this.get("UsrOfferType");
				var coeff = 0;
				if (offerTypeObject) {
					coeff = offerTypeObject.UsrCoeff;
					if (!coeff) {
						coeff = 0;
					}
				}
				var result = price * coeff;
				this.set("UsrCommissionUSD", result);
				this.set("UsrCommissionVirtual", result);
			},
            onEntityInitialized: function() {
                /* Вызывается родительская реализация метода. */
                this.callParent(arguments);
                /* Вызов метода-обработчика, который рассчитывает значение колонки [UsrCommissionUSD]. */
                this.calculateCommission();
            },
			onMyButtonClick: function() {
				this.console.log("Button pressed.");
				Terrasoft.showInformation("Кнопка нажата!");
			},
			getMyButtonEnabled: function() {
				var result = true;
				var realtyTypeObject = this.get("UsrType");
				if (!realtyTypeObject) {
					result = false;
				}
				return result;
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "UsrName019ddc04-1ca8-4191-ae08-5b6058d5e3a8",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrName",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FLOAT0b0670ff-d01e-46dd-aa2d-92c5e670326f",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrPriceUSD",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FLOAT6be53fc8-e07e-40a3-9cf5-93981c3f78f6",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrAreaM2",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MyButton",
				"values": {
					"itemType": 5,
					"caption": {
						"bindTo": "Resources.Strings.MyButtonCaption"
					},
					"click": {
						"bindTo": "onMyButtonClick"
					},
					"enabled": {
						"bindTo": "getMyButtonEnabled"
					},
					"style": "green",
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ProfileContainer"
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "FLOATd930ad1f-6b3f-4116-9139-33b965158505",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrCommissionUSD",
					"tip": {
						"content": {
							"bindTo": "Resources.Strings.FLOATd930ad1f6b3f4116913933b965158505Tip"
						}
					},
					"enabled": false
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrCommissionVirtualControl",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrCommissionVirtual",
					"caption": "Комиссия (виртуальное поле)",
					"enabled": false
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "LOOKUP4f565e58-15f3-4bd9-b31d-6a47095519aa",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrType",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "LOOKUP07633502-4060-498c-9ef2-9fe519a3270a",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrOfferType",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "LOOKUP64510bdb-e4ef-4d23-a2c5-cddb44102cd2",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "UsrCountry",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "LOOKUP08d34133-a19c-4349-818e-da4d4b3b0527",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "UsrCity",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "STRING595ea2aa-ef2e-480e-b213-a911a524b9ea",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 2,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "UsrComment",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Tabf1476860TabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tabf1476860TabLabelTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrSchemaaf0ce1a3Detaile0771625",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tabf1476860TabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "UsrNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 2
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
