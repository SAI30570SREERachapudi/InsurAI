package codes;
public class Array2 {
    public static void main(String[] args) {
        int[] nums = {5, 10, 15};
        int sum = 0;
        for (int num : nums)
            sum += num;
        System.out.println("Sum: " + sum);
    }
}
