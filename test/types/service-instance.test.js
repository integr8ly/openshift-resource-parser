import ServiceInstance from "../../src/types/service-instance";

const MOCK_SERVICE_INSTANCE_NAME = "enmasse-standard-4vrlt";
const MOCK_SERVICE_INSTANCE_URL = "https://console-enmasse.cluster-2qps4l7.opentry.me/console/eval";
const MOCK_SERVICE_INSTANCE_CLASS = "c3581d6c-edfd-3989-8d4f-1ac54f26d773";
const MOCK_SERVICE_INSTANCE = {
  "metadata": {
    "name": MOCK_SERVICE_INSTANCE_NAME,
    "generateName": "enmasse-standard-",
    "namespace": "eval",
    "selfLink": "/apis/servicecatalog.k8s.io/v1beta1/namespaces/eval/serviceinstances/enmasse-standard-4vrlt",
    "uid": "b571b683-ab7d-11e8-bcf6-0a580a800004",
    "resourceVersion": "432119",
    "generation": 1,
    "creationTimestamp": "2018-08-29T11:21:43Z",
    "finalizers": [
      "kubernetes-incubator/service-catalog"
    ]
  },
  "spec": {
    "clusterServiceClassExternalName": "enmasse-standard",
    "clusterServicePlanExternalName": "unlimited-standard",
    "clusterServiceClassRef": {
      "name": MOCK_SERVICE_INSTANCE_CLASS
    },
    "clusterServicePlanRef": {
      "name": "a8a23054-aed8-3222-baa6-beadb3a23be5"
    },
    "parametersFrom": [
      {
        "secretKeyRef": {
          "name": "enmasse-standard-parametersxx3vq",
          "key": "parameters"
        }
      }
    ],
    "externalID": "b571b610-ab7d-11e8-bcf6-0a580a800004",
    "userInfo": {
      "username": "evals@example.com",
      "uid": "",
      "groups": [
        "system:authenticated:oauth",
        "system:authenticated"
      ],
      "extra": {
        "scopes.authorization.openshift.io": [
          "user:full"
        ]
      }
    },
    "updateRequests": 0
  },
  "status": {
    "conditions": [
      {
        "type": "Ready",
        "status": "True",
        "lastTransitionTime": "2018-08-29T11:23:51Z",
        "reason": "ProvisionedSuccessfully",
        "message": "The instance was provisioned successfully"
      }
    ],
    "asyncOpInProgress": false,
    "orphanMitigationInProgress": false,
    "dashboardURL": MOCK_SERVICE_INSTANCE_URL,
    "reconciledGeneration": 1,
    "observedGeneration": 1,
    "externalProperties": {
      "clusterServicePlanExternalName": "unlimited-standard",
      "clusterServicePlanExternalID": "a8a23054-aed8-3222-baa6-beadb3a23be5",
      "parameters": {"name":"\u003credacted\u003e"},
      "parameterChecksum": "98e4010584838442dfebfa2c99ba7175ea1f9daa8e9f31395405ee1712f9d98e",
      "userInfo": {
        "username": "evals@example.com",
        "uid": "",
        "groups": [
          "system:authenticated:oauth",
          "system:authenticated"
        ],
        "extra": {
          "scopes.authorization.openshift.io": [
            "user:full"
          ]
        }
      }
    },
    "provisionStatus": "Provisioned",
    "deprovisionStatus": "Required"
  }
};

describe("ServiceInstance", () => {
  it("parses a JSON response successfully", () => {
    const serviceInstance = ServiceInstance.fromJSON(MOCK_SERVICE_INSTANCE);

    expect(serviceInstance.name).toBe(MOCK_SERVICE_INSTANCE_NAME);
    expect(serviceInstance.consoleURL).toBe(MOCK_SERVICE_INSTANCE_URL);
    expect(serviceInstance.clusterServiceClassId).toBe(MOCK_SERVICE_INSTANCE_CLASS);
  });
});
