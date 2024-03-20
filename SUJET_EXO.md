# Sujets exo

## J1

On a un formulaire d'inscription qui "marchouille" mais il manque pas mal de choses :

- afficher un message de succes a l'utilisateur
- si erreur, il faudrait l'afficher
- ce serait bien d'avoir un etat loading pour indiquer a l'utilisateur que la requete est en cours
- idealement, masquer les champs (puisqu'on vient de s'inscrire) ou au moins les désactiver (on verra plus tard comment rediriger vers une autre page)

Il va nous falloir des states :

- un message pour l'erreur (error)
- stocker le token si on l'obtient (reussite) (authToken)
- un state isLoading pour savoir si on est en chargement ou pas (isLoading)

Il va falloir des affichages conditionnels

- pour l'erreur
- pour l'etat de chargement

Deux facons de faire un affichage conditionnel :

- avec un ternaire `{error ? <Text>Ca marche pas</Text> : null}`
- avec un operateur && `{error && <Text>Ca marche pas</Text>}`

Quelques composants que l'on pourrait utiliser :

- https://gluestack.io/ui/docs/components/feedback/spinner pour le chargement
- https://gluestack.io/ui/docs/components/typography/text pour afficher l'erreur (en rouge avec la propriete color)
- https://gluestack.io/ui/docs/components/forms/form-control si vous voulez le faire a la bien
  ]

## J2

On aimerait faire une page pour voir le détail d'un workout.
La route `/workout/${id}`, sur laquelle on navige lors d'un clic sur la carte (hors bouton).

Avec ce que l'on a vu ajd et en s'inspirant du code existant :

- creer la route et trouver comment avoir un parametre de route pour l'id (direction react-router-native doc)
- créer la page
- recuperer le detail d'UN workout (GET /workout/{workout_id}) avec useApi
- faire un affichage avec la liste des exos

## J3

Coder la fonction handleSaveWorkout pour editer un workout dans EditWorkout.tsx

- appeller l'endpoint /workout/{workout_id} en PATCH
- on peut reutiliser bien sur le hook useApi (on peut appeler request plusieurs fois)
- attention a pas oublier le verbe PATCH
- bien sur, si ca fonctionne, rediriger vers la liste des workouts
