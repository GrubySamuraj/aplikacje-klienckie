public class klasy {
    public static void main(String[] args) {
        Car bmw = new Car();
        bmw.drive();
    }
    static class Car implements Drivable{
        //implementacja metody w klasie
        @Override
        public void drive() {
            System.out.println("cos");
        }
    }
    interface Drivable{
        void drive();
    }

}
