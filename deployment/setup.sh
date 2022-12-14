#!/bin/sh

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add stable https://kubernetes-charts.storage.googleapis.com/
helm repo update

kubectl apply -f namespaces.yml

kubectl apply -f services_ns
kubectl apply -f services_ns/ek -n services
kubectl apply -f services_ns/mq -n services
kubectl apply -f services_ns/redis -n services
kubectl apply -f services_ns/registry -n services
helm install -f services_ns/traefik/values.yml traefik traefik/traefik -n services

kubectl apply -f monitoring_ns/grafana -n monitoring
helm install -n monitoring kube-stack-prometheus prometheus-community/kube-prometheus-stack

echo GRAFANA CREDENTIALS
echo $(kubectl get secret --namespace monitoring kube-stack-prometheus-grafana -o jsonpath='{.data.admin-user}' | base64 -d)
echo $(kubectl get secret --namespace monitoring kube-stack-prometheus-grafana -o jsonpath='{.data.admin-password}' | base64 -d)
