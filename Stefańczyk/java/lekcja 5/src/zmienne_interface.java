public class zmienne_interface {
    public static void main(String[] args) {
        Auto a = new Auto();
        a.checkSpeed();
    }
    static class Auto implements Constants{
        void checkSpeed(){
            System.out.println(MAX_SPEED);
            System.out.println(MIN_SPEED);
        }
    }
    interface Constants{
        final int MAX_SPEED = 110;
        final int MIN_SPEED = 40;
    }
}
