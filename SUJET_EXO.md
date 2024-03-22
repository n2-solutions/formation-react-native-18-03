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

## J4

### Coder la page StartNewSession

```jsx
<Route path="/workout/:id/start-session" element={<StartSessionPage />} />
```

- Cest juste une page qui reprend le nom du workout, avec un texte du genre "About to start workout : workout.name"
- Du coup... ben il faut fetch le workout
- Quand on clique sur le bouton, faire un post sur /session

### Coder la page OngoingSession

- Je sais que...
  - on a un composant SetDataInput qui va nous servir pour la saisie d'un exo
  - on a tous les exos dans workout.exercises, on a plus qu'a les utiliser
  - il faudrait afficher un seul exo a la fois...
    - quand on appuie sur done, ca passe a la serie suivante, ou bien si on a fait toutes les series de l'exo, ca passe a l'exo suivant
    - du coup... il faudrait sans doute stocker sur quel exo on se trouve... et sur quelle serie on se trouve :)

#### Le payload

Je vais faire un `POST` sur `/session_exercise`. Exemple :

Si j'ai fait pour mon exercice :

10 repetitions a 40kg puis
10 repetitions a 35kg puis
8 repetitions a 30kg puis
8 repetitions a 30kg

je veux envoyer a l'API :

```json
{
  "reps": [10, 10, 8, 8],
  "weights": [40, 35, 30, 30],
  "session_id": 0,
  "exercise_id": 0
}
```

(Si exo calisthenic -> on envoie `"weights": [0, 0, 0, 0]`)
