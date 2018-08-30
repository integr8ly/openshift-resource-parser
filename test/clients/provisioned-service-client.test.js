import ProvisionedServiceClient from "../../src/clients/provisioned-service-client";

const MOCK_SERVICE_INSTANCE_RESPONSE = {
  "kind": "ServiceInstanceList",
  "apiVersion": "servicecatalog.k8s.io/v1beta1",
  "metadata": {
    "selfLink": "/apis/servicecatalog.k8s.io/v1beta1/namespaces/eval/serviceinstances",
    "resourceVersion": "522431"
  },
  "items": [
    {
      "metadata": {
        "name": "enmasse-standard-4vrlt",
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
          "name": "c3581d6c-edfd-3989-8d4f-1ac54f26d773"
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
        "dashboardURL": "https://console-enmasse.cluster-2qps4l7.opentry.me/console/eval",
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
    }
  ]
};

const MOCK_SERVICE_INSTANCE_EMPTY_RESPONSE = {
  "kind": "ServiceInstanceList",
  "apiVersion": "servicecatalog.k8s.io/v1beta1",
  "metadata": {
    "selfLink": "/apis/servicecatalog.k8s.io/v1beta1/namespaces/eval/serviceinstances",
    "resourceVersion": "522431"
  },
  "items": []
};

const MOCK_SERVICE_CLASS_RESPONSE = {
  "kind": "ClusterServiceClassList",
  "apiVersion": "servicecatalog.k8s.io/v1beta1",
  "metadata": {
    "selfLink": "/apis/servicecatalog.k8s.io/v1beta1/clusterserviceclasses",
    "resourceVersion": "522429"
  },
  "items": [
    {
      "metadata": {
        "name": "c3581d6c-edfd-3989-8d4f-1ac54f26d773",
        "selfLink": "/apis/servicecatalog.k8s.io/v1beta1/clusterserviceclasses/c3581d6c-edfd-3989-8d4f-1ac54f26d773",
        "uid": "e0f38601-aac7-11e8-bcf6-0a580a800004",
        "resourceVersion": "228186",
        "creationTimestamp": "2018-08-28T13:40:08Z"
      },
      "spec": {
        "externalName": "enmasse-standard",
        "externalID": "c3581d6c-edfd-3989-8d4f-1ac54f26d773",
        "description": "A standard address space consists of an AMQP router network in combination with attachable 'storage units'. The implementation of a storage unit is hidden from the client and the routers with a well defined API.",
        "bindable": true,
        "bindingRetrievable": false,
        "planUpdatable": false,
        "externalMetadata": {"displayName":"EnMasse (standard)","documentationUrl":"https://github.com/EnMasseProject/enmasse","imageUrl":"https://raw.githubusercontent.com/EnMasseProject/enmasse/master/documentation/images/logo/enmasse_icon.png","providerDisplayName":"EnMasse"},
        "tags": [
          "middleware",
          "messaging",
          "amqp",
          "mqtt",
          "enmasse"
        ],
        "clusterServiceBrokerName": "enmasse"
      },
      "status": {
        "removedFromBrokerCatalog": false
      }
    }
  ]
};



describe("ProvisionedServiceClient", () => {
  it("retrieves an existing service successfully", done => {
    fetch.once(JSON.stringify(MOCK_SERVICE_CLASS_RESPONSE))
    .once(JSON.stringify(MOCK_SERVICE_INSTANCE_RESPONSE));

    const provisionedServiceClient = new ProvisionedServiceClient("mycluster.com");

    provisionedServiceClient.getProvisionedService("test", "test", "enmasse-standard-4vrlt")
    .then(provisionedService => {
      expect(provisionedService.name).toBe("enmasse-standard-4vrlt")
      done();
    });
  });

  it("causes an error when a service is not found", done => { 
    fetch.once(JSON.stringify(MOCK_SERVICE_CLASS_RESPONSE))
    .once(JSON.stringify(MOCK_SERVICE_INSTANCE_RESPONSE));

    const provisionedServiceClient = new ProvisionedServiceClient("mycluster.com");
     
    provisionedServiceClient.getProvisionedService("test", "test", "test")
    .then(() => done.fail())
    .catch(err => done());
  });

  it("retrieves a list of services successfully", done => {
    fetch.once(JSON.stringify(MOCK_SERVICE_CLASS_RESPONSE))
    .once(JSON.stringify(MOCK_SERVICE_INSTANCE_RESPONSE));

    const provisionedServiceClient = new ProvisionedServiceClient("mycluster.com");

    provisionedServiceClient.listProvisionedServices("test", "test")
    .then(provisionedServices => {
      expect(provisionedServices.length).toBe(1);
      expect(provisionedServices[0].name).toBe("enmasse-standard-4vrlt");
      done();
    });
  });

  it("returns an empty list when no services are retrieved", done => {
    fetch.once(JSON.stringify(MOCK_SERVICE_CLASS_RESPONSE))
    .once(JSON.stringify(MOCK_SERVICE_INSTANCE_EMPTY_RESPONSE));

    const provisionedServiceClient = new ProvisionedServiceClient("mycluster.com");

    provisionedServiceClient.listProvisionedServices("test", "test")
    .then(provisionedServices => {
      expect(provisionedServices.length).toBe(0);
      done();
    });
  });
});
