public class dziedziczenie {
    public static void main(String[] args) {
        Car bmw = new Car();
        bmw.drive();
    }
    static class Car implements Drivable, Constants{

        private int speed = 100;

        @Override
        public void drive() {
            if(speed < MAX_SPEED && speed > MIN_SPEED) System.out.println("JEDŹ DALEJ");
            else if(speed > MAX_SPEED ) System.out.println("ZWOLNIJ");
            else if (speed < MIN_SPEED) System.out.println("PRZYSPIESZ");
        }
    }
    interface Constants{
        final int MAX_SPEED = 110;
        final int MIN_SPEED = 40;
    }
    interface Drivable{
        void drive();
    }
}
