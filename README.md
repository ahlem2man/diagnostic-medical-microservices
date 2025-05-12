Projet :Système de Diagnostic Médical Basé sur Symptômes
1.	Présentation générale :
Ce projet est une plateforme de diagnostic médical utilisant une architecture à base de microservices. L'utilisateur fournit des symptômes, et le système retourne un diagnostic probable, des recommandations médicales et enregistre des logs pour audit et statistiques.

2.	Objectif :
Fournir un système distribué capable de :
•	Diagnostiquer des maladies à partir de symptômes.
•	Générer des recommandations médicales.
•	Journaliser les diagnostics via Kafka.
•	Centraliser l'accès via une API Gateway REST & GraphQL.
•	Offrir un tableau de bord de visualisation avec graphiques.

4.	Technologies utilisées :
Composant	Technologie
API Gateway	Express, REST, GraphQL
Diagnostic	gRPC (Protocol Buffers + Node.js)
Kafka	Apache Kafka + KafkaJS
Audit & Historique	MongoDB + Express
Recommandation	GraphQL + Apollo Server
Frontend (Dashboard)	HTML/CSS/JS + Chart.js

5.	Architecture des microservices :
Le projet suit une architecture microservices avec les technologies suivantes :
•	symptom-service (REST : pour la communication classique)
•	diagnosis-engine (gRPC : pour la communication rapide inter-services,).
•	recommendation-service (GraphQL: pour les requêtes flexibles).
•	audit-log-service (Kafka consumer : pour le streaming de messages (log),+ MongoDB : pour le stockage des logs,).
•	api-gateway (REST + GraphQL).
•	Dashboard (HTML statique avec JS : pour le tableau de bord visuel.).

7.	Flux de données :
•	L’utilisateur envoie une requête de diagnostic à /symptoms via l’API Gateway.
•	Le symptom-service appelle le diagnosis-engine via gRPC.
•	Le résultat est renvoyé à l’utilisateur et en parallèle envoyé à Kafka.
•	L’audit-log-service consomme ce message Kafka et le sauvegarde dans MongoDB.
•	Le recommendation-service peut être interrogé via GraphQL pour fournir des conseils médicaux.
•	Le dashboard.html affiche les statistiques générales et les diagnostics les plus récents.

9.	Détail de chaque microservice :
a)	Symptom-service :
•	Endpoint REST : POST /symptoms
•	Fonction : Reçoit les symptômes via une requête POST et Appelle le service de diagnostic gRPC et publie  les résultats sur Kafka.
•	Routes :POST /symptoms
  
•	 Technologies :
•	Express.js (REST)
•	KafkaJS (Producteur Kafka)
•	gRPC client (communication avec diagnosis-engine)

b)	diagnosis-engine (gRPC) :
•	Service gRPC sur localhost:50051 
•	Reçoit une liste de symptômes et retourne un diagnostic (Grippe, Covid, etc.).
•	Fonction gRPC:
•	GetDiagnosis({ symptoms: [...] }) → { result: "..." }
•	Technologies :
•	gRPC server
•	Node.js

c)	recommendation-service (GraphQL) :
•	Serveur GraphQL sur localhost:4000/graphql
•	Reçoit un diagnostic et retourne une liste de recommandations( des conseils médicaux).
•	Exemple de requête GraphQL :
 
d)	audit-log-service (Kafka Consumer + MongoDB) :
•	Consomme les diagnostics depuis Kafka.
•	Stocke les données dans MongoDB (diagnosis_logs).
 

e)	API Gateway (REST + GraphQL) :
•	REST : POST /api/symptoms: redirige vers symptom-service
•	 Point d'entrée unique pour les clients.
•	Transmet les appels vers les bons microservices (symptom-service, recommendation-service...).
•	Endpoint : /graphql
•	Exemple mutation GraphQL :
 
f)	Dashboard (Frontend) :( http://localhost:4001/dashboard.html)
•	statistiques :
•	Affiche le nombre total de diagnostics,le dernier diagnostic et un graphique camembert des diagnostics par type.
•	Tech :
•	HTML + CSS
•	JS + fetch()
•	Chart.js (pour les statistiques)
•	Endpoints utilisés :
•	GET http://localhost:3002/logs (depuis audit-log-service)
 
7.	Tests & Validation :
•	Tests Postman pour REST et GraphQL.
•	Logs visibles dans MongoDB Compass.
•	Dashboard avec pie chart dynamique.

