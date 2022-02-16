import java.util.ArrayList;

public class ZadanieZoo {
    public static void main(String[] args) {
        Lion lion = new Lion("Big Lion", 9, 99.9);
        Tiger tiger = new Tiger("Tiger w paski", 10, 100.9);
        Rabbit rabbit = new Rabbit("Rabbit w kapuście", 1, 3.3);
        Parrot papuga = new Parrot("Papuga gaduła", 77, 1.1);

        System.out.println(lion);
        lion.setAnimalName("Nowy Big Lion");
        System.out.println(lion);
        lion.eat(10.0);
        System.out.println(lion);
        lion.growOld(1);
        System.out.println(lion);

        ArrayList<Animal> animals = new ArrayList<>();
        animals.add(lion);
        animals.add(tiger);
        animals.add(rabbit);
        animals.add(papuga);
        System.out.println(animals);
    }
    static class Animal {

        private String name;
        private int age;
        private double weight;

        public Animal(String name, int age, double weight) {
            this.name = name;
        }

        @Override
        public String toString() {
            return this.name + "->" + this.age + "->" + this.weight;
        }
        void setAnimalName(String name){
            this.name = name;
        }
        void growOld(int age){
            this.age+=age;
        }
        void eat(double weight) {
            this.weight += weight;
        }
    }

    static class Lion extends Animal{
        public Lion(String name, int age, Double weight) {
            super(name, age, weight);
        }
    }

    static class Tiger extends Animal{
        public Tiger (String name, int age, Double weight) {
            super(name, age, weight);
        }
    }

    static class Rabbit extends Animal{
        public Rabbit (String name, int age, Double weight) {
            super(name, age, weight);
        }
    }

    static class Parrot extends Animal{
        public Parrot (String name, int age, Double weight) {
            super(name, age, weight);
        }
    }
}
