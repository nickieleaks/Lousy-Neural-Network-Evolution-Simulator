# EvolvingEcosystem
neural network evolving entities

Tested and runs in Google Chrome. A simple prototype with Javascript, HTML Canvas, and CSS. Heavily inspired by evolution and life simulations like Gridworld,  The Bibites, and  LSES. For much more complex behaviour, do check them out, and others.

Libraries used: Lodash, Neataptic, Quadtree, and Camera

If there are no creatures present, a single creature will generate with a random neural network. Creatures may attempt to reproduce. If they have enough energy, they are successful, and their offspring have a slight chance of mutation. A mutation will change the one of the creature's four colours and alter either its properties or its neural network. 

Creatures that are better at surviving will outcompete those who are simply less good, as natural selection rewards those who thrive with the limited resources and it is they who will have more children.

There is some functionality where you can zoom in and observe creatures according to some parameters, such as longest-lived, youngest, etc. You can also toggle the spawning of food across the whole map or in special areas, and perform some events. This exerts evolutionary pressure on the creatures, encouraging them to adapt to the different environments.

The neural networks receive some inputs, and depending on the configuration of the network, the creatures perform certain outputs. If the inputs and outputs were tweaked, the creatures could probably perform more complex tasks, but their behaviour is limited to simpleness as I didn't implement many features: the most complex behaviour I ever observed was them learning to avoid the red outer wall (which when they go into, they die) after 250,000 turns. (I just ran it in the background).
