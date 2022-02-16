public class dziedziczenie2 {
    public static void main(String[] args) {
        Auto a = new Auto();
        a.preparationForDriving();
    }
    interface Securitable{
        void preparationForDriving();
    }
    interface SpeedConstants extends Securitable{
        final int MAX_SPEED = 110;
        final int MIN_SPEED = 40;
    }

    interface GasConstants extends Securitable{
        final int GAS_MIN_CAPACITY = 10;
    }
    static class Auto implements SpeedConstants, GasConstants{

        int speed = 100;
        int gasCapacity = 20;

        @Override
        public void preparationForDriving() {
            if(gasCapacity >  GAS_MIN_CAPACITY
                    && speed < MAX_SPEED
                    && speed > MIN_SPEED)
                System.out.println("YOU ARE PREPARED");

            else
                System.out.println("YOU ARE NOT PREPARED");

        }
    }
}
